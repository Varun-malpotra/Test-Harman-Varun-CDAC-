import * as cache from "memory-cache";
import moment from "moment";
import { logger } from "../../common/logger";
import { MessageBroker } from "../../common/messageBroker";
import {
    petrolPricesForCities,
    PricingTopic,
} from "../../fixtures/petrol-pricing";

export const priceCalculator = (seconds: number, pricePer30Seconds: number) => {
    console.log({ seconds, pricePer30Seconds });
    return ((pricePer30Seconds / 30) * seconds).toFixed(2);
};
/**
 * Subscription to "lidToggle"
 */
export const getPetrolPrice = async (
    city: string,
    lidIsOpen: boolean,
): Promise<void> => {
    try {
        if (!city) {
            throw new Error("Invalid city");
        }
        const petrolCacheTerm = city + "PetrolPrice";
        let petrolPrice = cache.get(petrolCacheTerm);
        if (!petrolPrice) {
            petrolPrice = petrolPricesForCities()[city];
            cache.put(petrolCacheTerm, petrolPrice);
        }
        if (lidIsOpen) {
            cache.put("startedAt", new Date());
        } else {
            const startedAt = cache.get("startedAt");
            console.log({ startedAt });
            const diff = moment(startedAt).diff(moment(), "seconds");
            logger.info(`time difference ${Math.abs(diff)} seconds`);
            logger.info({
                "Total Cost is": priceCalculator(
                    Math.abs(diff || 0),
                    petrolPrice,
                ),
            });
            cache.del("startedAt");
        }

        logger.info(`PetrolPrice For ${city} is ${petrolPrice}`);
    } catch (e) {
        logger.error(e);
    }
};

export const subscribeToPriceEvent = () => {
    MessageBroker.subscribe(PricingTopic, params => {
        getPetrolPrice(params.city, !!params.lid);
    });
};
