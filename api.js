import {getPostcodeLocation} from "./api_clients/postcodeApiClient.js";
import {getBusStopInfo, getDepartureInfo, getStopPointsByLocation} from "./api_clients/tflApiClient.js";
import log4js from "log4js";

const logger = log4js.getLogger('API');

export async function getDeparturesForNNearestBusStops (postcode, numberOfBusStops) {
    let lat,lon;
    try {
        try { //TODO tidy this try/catch up?
            [lat,lon] = await getPostcodeLocation(postcode);
        } catch (error) {
            logger.warn("Invalid postcode received")
            return(error)
        }
        logger.info("Postcode longitude and latitude retrieved");
        const stopTypes = "NaptanPublicBusCoachTram";
        const radius = 500;

        let nearestBusStops = await getStopPointsByLocation(lat, lon, stopTypes, radius);
        //todo - check length of nearestBusStops - if empty return 404/other error
        return await getDeparturesForNBusStops(numberOfBusStops, nearestBusStops)
    } catch (error) {
        return error;
    }
}

async function getDeparturesForNBusStops (max, nearestBusStops){
    let busStops = {}
    for (let i = 0; i < Math.min(max, nearestBusStops.length); i++) {
        await getBusStopInfo(nearestBusStops[i].id)
            .then(getDepartureInfo)
            .then((response) => busStops[nearestBusStops[i].commonName]=response)
    }
    console.log(busStops)
    return busStops
}
