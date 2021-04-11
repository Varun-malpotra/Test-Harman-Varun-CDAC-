// Using mocked pricing data instead of calling

import { getRndInteger } from "../common/utils";
import { cities } from "./cities-list";

// https://developer.here.com/documentation/fuel-prices/dev_guide/topics/resource-schema.html
export const petrolPricesForCities = () => {
    const pricingObject: any = {};

    cities.map(city => {
        pricingObject[city] = getRndInteger(85, 100);
    });
    return pricingObject;
};
export const PricingTopic = "PricingTopic";
