import axios from "axios";
import log4js from "log4js";
import BusStop from "../models/BusStop.js"
const logger = log4js.getLogger('index.js');

export function getStopPointsByLocation(lat, lon, stopTypes, radius) {
    return axios.get('https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon +
        '&stopTypes=' + stopTypes + '&radius=' + radius).then((response) => response.data.stopPoints);
}

export function getBusStopInfo (stopCode)  {
    logger.info("Getting bus stop information from stopCode: " + stopCode);
    return axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals').catch((error) => {
        console.log("Error in finding bus stop: " + error.response.data.message);
    })

}

export function getDepartureInfo (busStopPromise) {
        return busStopPromise.then((response) => {
            const busStop = new BusStop(response.data);
            return busStop.getNIncomingBuses(5);
        }).catch((e) => console.log("Error obtaining departure info: " + e));


}

