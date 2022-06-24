import log4js from "log4js";

const logger = log4js.getLogger('Bus Model');

export default class Bus {
    constructor(busInfo) {
        logger.trace("Constructing Bus object with busInfo " + busInfo);
        this.lineName = busInfo.lineName
        this.destinationName = busInfo.destinationName
        this.towards = busInfo.towards
        this.timeToStation = busInfo.timeToStation
    }
}