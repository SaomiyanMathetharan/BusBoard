import axios from "axios";
import log4js from "log4js";
import BusStop from "../models/BusStop.js"
const logger = log4js.getLogger('TFL API Client');

export function getStopPointsByLocation(lat, lon, radius = 500) {
    logger.info("Retrieving stop points by location");
    return axios.get('https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon +
        '&stopTypes=NaptanPublicBusCoachTram&radius=' + radius).then((response) => response.data.stopPoints).catch((error) => {
        logger.warn("Error in finding bus stops");
        console.log("Error in finding bus stops: " + error.response.data.message);
        return error;
    });
}

export function getBusStopInfo (stopCode)  {
    logger.info("Getting bus stop information from stopCode: " + stopCode);
    return axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals').catch((error) => {
        logger.warn("Error in finding bus stop");
        console.log("Error in finding bus stop: " + error.response.data.message);
        return error;
    })
}

export function getDepartureInfo (busStopData) {
    logger.info("Retrieving departure information for bus stops");
    const busStop = new BusStop(busStopData.data);
    return busStop.getNIncomingBuses(5);
}

