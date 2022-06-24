import Bus from "./Bus.js"
import log4js from "log4js";

const logger = log4js.getLogger('Bus Stop Model');

export default class BusStop {

    constructor(busStopInfo, busStopName) {
        this.stationName = busStopName;
        logger.trace("Creating BusStop using busStopInfo " + this.stationName + ": "+busStopInfo);
        logger.trace("Converting TFL bus objects into server bus objects.");

        this.incomingBuses = [];
        for (let i = 0; i < busStopInfo.length; i++) {
            this.incomingBuses.push(new Bus(busStopInfo[i]))
        }
        logger.trace("Sorting incoming buses by time to station");
        this.sortIncomingBusesByTimeToStation();
    }

    sortIncomingBusesByTimeToStation (){
        this.incomingBuses = this.incomingBuses.sort((a, b) => a.timeToStation - b.timeToStation);
    }

    getNIncomingBuses(number) {
        let buses = [];
        for (let i = 0; i < Math.min(number, this.incomingBuses.length); i++) {
            buses.push(this.incomingBuses[i]);
        }
        return buses;
    }
}