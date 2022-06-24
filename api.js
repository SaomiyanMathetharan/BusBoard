import {getPostcodeLocation} from "./api_clients/postcodeApiClient.js";
import {getBusStopInfo, getDepartureInfo, getStopPointsByLocation} from "./api_clients/tflApiClient.js";
import log4js from "log4js";

const logger = log4js.getLogger('API');

export async function getDeparturesForNNearestBusStops (postcode, numberOfBusStops) {

    return getPostcodeLocation(postcode).then((location) => getStopPointsByLocation(location[0], location[1]))
        .then((nearestBusStops) => getDeparturesForNBusStops(numberOfBusStops, nearestBusStops))
        .catch((error) => {
            return(Promise.reject(error))
        });


}

async function getDeparturesForNBusStops (max, nearestBusStops){
    if (nearestBusStops.length < 1) {
        return(Promise.reject("No bus stops found"))
    }
    let busStops = {}
    for (let i = 0; i < Math.min(max, nearestBusStops.length); i++) {
        await getBusStopInfo(nearestBusStops[i].id)
            .then(getDepartureInfo)
            .then((response) => busStops[nearestBusStops[i].commonName]=response)
    }
    return busStops;
}
