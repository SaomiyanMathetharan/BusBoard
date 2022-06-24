import {getPostcodeLocation} from "./api_clients/postcodeApiClient.js";
import {getBusStopInfo, getDepartureInfo, getStopPointsByLocation} from "./api_clients/tflApiClient.js";

export async function getNearestBusStops (postcode) {
    let lat,lon;
    try {
        [lat,lon] = await getPostcodeLocation(postcode); //
        const stopTypes = "NaptanPublicBusCoachTram";
        const radius = 500;
        let nearestBusStops = await getStopPointsByLocation(lat, lon, stopTypes, radius);

        return await getDepartureInfoForNBusStops(2, nearestBusStops)
    } catch (e) {

    }
}

async function getDepartureInfoForNBusStops (max, nearestBusStops){
    let busStops = {}
    for (let i = 0; i < Math.min(max, nearestBusStops.length); i++) {
        await getBusStopInfo(nearestBusStops[i].id)
            .then(getDepartureInfo)
            .then((response) => busStops[i]=response)
    }
    console.log(busStops)
    return busStops
}
// busStops[key] = value