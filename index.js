import axios from 'axios';
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

/*
 function getDepartureInfo (stopCode)  {
    logger.info("Getting departure information from stopCode: " + stopCode);
    return axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals')
        .then((response) => {
            let busInfo = response.data;
            console.log("Station name: " + busInfo[0].stationName +'\n');
            if (busInfo.length > 0) { // buses are arriving
                busInfo = busInfo.sort((a, b) => a.timeToStation - b.timeToStation);
                for (let i = 0; i < Math.min(5, busInfo.length); i++) {

                    console.log("Line Name: " + busInfo[i].lineName);
                    console.log("Destination Name: " + busInfo[i].destinationName);
                    console.log("Towards: " + busInfo[i].towards);
                    console.log("Time to station: " + Math.round(busInfo[i].timeToStation / 60) + " minutes");
                    console.log();
                }
            }
        })
        .catch((error) => {
            console.log("Error in finding bus stop: " + error.response.data.message);
        })
}
*/


async function getNearestBusStops (postcode) {
    let lat,lon;
    try {
        [lat,lon] = await getPostcodeLocation(postcode); //
        const stopTypes = "NaptanPublicBusCoachTram";
        const radius = 500;
        let nearestBusStops = await getStopPointsByLocation(lat, lon, stopTypes, radius);

        for (let i = 0; i < Math.min(2, nearestBusStops.length); i++) {
            let response = getDepartureInfo(await getBusStopInfo(nearestBusStops[i].id));
            console.log(response);
        }
    } catch (e) {

    }
}

