import {getPostcodeLocation} from "./api_clients/postcodeApiClient.js";
import {getBusStopInfo, getDepartureInfo, getStopPointsByLocation} from "./api_clients/tflApiClient.js";

export async function getNearestBusStops (postcode) {
    let lat,lon;
    try {
        [lat,lon] = await getPostcodeLocation(postcode); //
        const stopTypes = "NaptanPublicBusCoachTram";
        const radius = 500;
        let nearestBusStops = await getStopPointsByLocation(lat, lon, stopTypes, radius);

        for (let i = 0; i < Math.min(2, nearestBusStops.length); i++) {
            await getBusStopInfo(nearestBusStops[i].id)
                .then(getDepartureInfo)
                .then((response) => console.log(response))
        }
    } catch (e) {

    }
}
