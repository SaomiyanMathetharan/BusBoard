import axios from 'axios';
import {question} from 'readline-sync';

//https://api.tfl.gov.uk/StopPoint/{id}/Arrivals

getNearestBusStops('B440SE')


// const stopCode = question('Please type a bus stopcode.\n').trim();

// getDepartureInfo(stopCode)
// let stopCode = '490012409N'

async function getDepartureInfo (stopCode)  {
    axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals')
        .then((response) =>{
            // handle success
            console.log(response.data);
            let busInfo = response.data;
            // TODO: sort bus by timeToStation
            busInfo = busInfo.sort((a,b) => a.timeToStation > b.timeToStation ? 1 : -1);
            for (let i = 0; i < Math.min(5, busInfo.length); i++) {

                console.log("Station Name: " + busInfo[i].stationName);
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
    return axios.get('http://api.postcodes.io/postcodes/' + postcode)
        .then((response) => {
            // console.log(response.data.result.latitude);
            response.data
            // return ({latitude:response.data.result.latitude, longitude:response.data.result.longitude});
        })
        .catch((error) => {
            console.log(error);
        })

}

async function getNearestBusStops (postcode) {
    let location = getPostcodeLocation(postcode).then(location => console.log(location));
    console.log(location)
}