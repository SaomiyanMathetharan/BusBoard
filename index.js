import axios from 'axios';
import {question} from 'readline-sync';
import log4js from 'log4js';

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'warn'}
    }
});

const logger = log4js.getLogger('index.js');

logger.info("Asking user for postcode");
const postcode = question('Please type a postcode.\n').trim();
getNearestBusStops(postcode) //NW51TL


async function getDepartureInfo (stopCode)  {
    logger.info("Getting departure information from stopCode: " + stopCode);
    axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals')
        .then((response) => {
            let busInfo = response.data;
            console.log("Station name: " + busInfo[0].stationName +'\n');
            if (busInfo.length > 0) { // buses are arriving
                busInfo = busInfo.sort((a, b) => a.timeToStation > b.timeToStation ? 1 : -1);
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

async function getPostcodeLocation (postcode) {
    logger.info("Retrieving postcode longitude and latitude");
    let response = await axios.get('http://api.postcodes.io/postcodes/' + postcode)
                                .catch((error) => {
                                    logger.warn("Error retrieving postcode: " + error);
                                    console.log(error);
                                })
    //todo determine if api response is valid
    return [response.data.result.latitude, response.data.result.longitude]
}

async function getNearestBusStops (postcode) {
    let [lat,lon] = await getPostcodeLocation(postcode);
    const stopTypes = "NaptanPublicBusCoachTram";

    let nearestBusStops = (await axios.get('https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon +
        '&stopTypes=' + stopTypes + '&radius=' + 500)).data.stopPoints;

    for (let i = 0; i < Math.min(2, nearestBusStops.length); i++) {
        await getDepartureInfo(nearestBusStops[i].id);

    }

}

