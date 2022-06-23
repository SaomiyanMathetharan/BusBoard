import axios from 'axios';

let stopCode = '490012409N'
axios.get('https://api.tfl.gov.uk/StopPoint/Search/' + stopCode)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });