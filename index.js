import {question} from 'readline-sync';
import log4js from 'log4js';
import {getBusStopInfo, getDepartureInfo, getStopPointsByLocation} from "./api_clients/tflApiClient.js";
import {getPostcodeLocation} from "./api_clients/postcodeApiClient.js";

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'debug'}
    }
});

const logger = log4js.getLogger('index.js');

logger.info("Asking user for postcode");
const postcode = question('Please type a postcode.\n').trim();
getNearestBusStops(postcode) //NW51TL



async function getNearestBusStops (postcode) {
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

