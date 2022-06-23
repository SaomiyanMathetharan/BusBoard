import axios from 'axios';
import {question} from 'readline-sync';

//https://api.tfl.gov.uk/StopPoint/{id}/Arrivals

const stopCode = question('Please type a bus stopcode.\n').trim();

// let stopCode = '490012409N'
axios.get('https://api.tfl.gov.uk/StopPoint/' + stopCode + '/Arrivals')
    .then(function (response) {
        // handle success
        console.log(response.data);
        const busInfo = response.data;
        // TODO: sort bus by timeToStation
        for (let i = 0; i < Math.min(5, busInfo.length); i++) {

            console.log("Station Name: " + busInfo[i].stationName);
            console.log("Line Name: " + busInfo[i].lineName);
            console.log("Destination Name: " + busInfo[i].destinationName);
            console.log("Towards: " + busInfo[i].towards);
            console.log("Time to station: " + busInfo[i].timeToStation / 60);
            console.log();
        }

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });