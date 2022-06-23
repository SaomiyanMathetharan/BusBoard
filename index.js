import axios from 'axios';
import {question} from 'readline-sync';

//https://api.tfl.gov.uk/StopPoint/{id}/Arrivals

getNearestBusStops('W1A 1AA')
// NW51TL
//  W1A 1AA
// const stopCode = question('Please type a bus stopcode.\n').trim();

// getDepartureInfo(stopCode)
// let stopCode = '490012409N'

async function getDepartureInfo (stopCode)  {
    axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals')
        .then((response) =>{
            // handle success
            // console.log(response.data);
            let busInfo = response.data;
            // TODO: sort bus by timeToStation
            busInfo = busInfo.sort((a,b) => a.timeToStation > b.timeToStation ? 1 : -1);
            for (let i = 0; i < Math.min(5, busInfo.length); i++) {

                console.log("Line Name: " + busInfo[i].lineName);
                console.log("Destination Name: " + busInfo[i].destinationName);
                console.log("Towards: " + busInfo[i].towards);
                console.log("Time to station: " + Math.round(busInfo[i].timeToStation / 60) + " minutes");
                console.log();
            }

        })
        .catch((error) => {
            console.log(error);
        })
}

async function getPostcodeLocation (postcode) {
    let response = await axios.get('http://api.postcodes.io/postcodes/' + postcode)
                                .catch((error) => {
                                    console.log(error);
                                })
    //todo determine if api response is valid
    return [response.data.result.latitude, response.data.result.longitude]
}

async function getNearestBusStops (postcode) {
    let [lat,lon] = await getPostcodeLocation(postcode);
    const stopTypes = "NaptanPublicBusCoachTram";
    //todo connect this to tfl
    let nearestBusStops = (await axios.get('https://api.tfl.gov.uk/StopPoint/?lat=' + lat + '&lon=' + lon +
        '&stopTypes=' + stopTypes + '&radius=' + 500)).data.stopPoints;
    // nearestBusStops = nearestBusStops.sort((a,b) => a.distance > b.distance ? 1 : -1);  -
    for (let i = 0; i < Math.min(2, nearestBusStops.length); i++) {
        console.log("Station name: " + nearestBusStops[i].stationName);
        console.log(await getDepartureInfo(nearestBusStops[i].id));
    }
    //console.log(nearestBusStops);

}
///?lat={lat}&lon={lon}&stopTypes={stopTypes}

/* ["CarPickupSetDownArea","NaptanAirAccessArea","NaptanAirEntrance","NaptanAirportBuilding","NaptanBusCoachStation",
"NaptanBusWayPoint","NaptanCoachAccessArea","NaptanCoachBay","NaptanCoachEntrance","NaptanCoachServiceCoverage",
"NaptanCoachVariableBay","NaptanFerryAccessArea","NaptanFerryBerth","NaptanFerryEntrance","NaptanFerryPort",
"NaptanFlexibleZone","NaptanHailAndRideSection","NaptanLiftCableCarAccessArea","NaptanLiftCableCarEntrance",
"NaptanLiftCableCarStop","NaptanLiftCableCarStopArea","NaptanMarkedPoint","NaptanMetroAccessArea","NaptanMetroEntrance",
"NaptanMetroPlatform","NaptanMetroStation","NaptanOnstreetBusCoachStopCluster","NaptanOnstreetBusCoachStopPair",
"NaptanPrivateBusCoachTram","NaptanPublicBusCoachTram","NaptanRailAccessArea","NaptanRailEntrance","NaptanRailPlatform",
"NaptanRailStation","NaptanSharedTaxi","NaptanTaxiRank","NaptanUnmarkedPoint","TransportInterchange"]

 */