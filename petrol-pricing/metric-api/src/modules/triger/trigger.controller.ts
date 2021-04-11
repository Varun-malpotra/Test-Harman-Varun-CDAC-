import { EPublishType } from "evodove";
import { logger } from "../../common/logger";
import * as cache from "memory-cache";
import { ParameterizedContext } from "koa";
import { MessageBroker } from "../../common/messageBroker";
import { getRandomCity } from "../../fixtures/cities-list";
import {
    petrolPricesForCities,
    PricingTopic,
} from "../../fixtures/petrol-pricing";

// Open lid and start triggering
export const publishMessageAtInterval = async () => {
    logger.info("Starting publishing event");

    cache.put("lid", true);
    setInterval(() => {
        const lid = cache.get("lid");
        cache.put("lid", !lid);
        MessageBroker.publish(
            PricingTopic,
            { lid, city: getRandomCity() },
            { type: EPublishType.DIRECT, waitSubscribers: true, ttl: 10000 },
        );
    }, 0.5 * 60 * 1000);
};
/**
 * Trigger through API call
 * /trigger
 * @Request: POST
 * @params {fuelLid, city}
 */
export const publishMessageOnRequest = async (
    ctx: ParameterizedContext<any, any>,
) => {
    try {
        const { fuelLid, city } = ctx.request.body;
        if (!city || !petrolPricesForCities()[city]) {
            throw new Error("City is invalid");
        }

        logger.info("Publishing");
        if (cache.get("lid") === fuelLid) {
            throw new Error(`FuelLid already in ${fuelLid} state`);
        }

        cache.put("lid", !fuelLid);
        MessageBroker.publish(
            PricingTopic,
            { lid: fuelLid, city },
            { type: EPublishType.DIRECT, waitSubscribers: true, ttl: 10000 },
        );
        ctx.body = "success";
    } catch (e) {
        ctx.log.error("Error", e);
        ctx.throw(400, e.message || e);
    }
};
