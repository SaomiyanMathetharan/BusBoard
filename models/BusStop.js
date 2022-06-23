export default class BusStop {
    constructor(busStopInfo) {
        this.stationName = busStopInfo[0].stationName;
        this.incomingBuses = busStopInfo;
        this.sortIncomingBusesByTimeToStation();
    }

    sortIncomingBusesByTimeToStation (){
        this.incomingBuses = this.incomingBuses.sort((a, b) => a.timeToStation - b.timeToStation);
    }

    getNIncomingBuses(number) {
        let buses = []
        for (let i = 0; i < Math.min(number, this.incomingBuses.length); i++) {
            buses.push(this.incomingBuses[i]);
        }
        return buses;
    }
}