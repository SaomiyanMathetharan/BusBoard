function sendDepartureInfoRequest() {
    let xhttp = new XMLHttpRequest();

    let postcode = document.getElementById('postcodeTextbox').value

    xhttp.open('GET', 'http://localhost:3000/departureBoards/' + postcode, true);

    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function () {

        if (xhttp.status === 200) {
            showDepartureInfoFromServer(xhttp.response)
        } else {
            document.getElementById("results").innerHTML = `<h2>Error - ` + xhttp.responseText + `</h2>`;
        }
    }

    xhttp.send();
}

function showDepartureInfoFromServer(busStops) {
    let departureInfoHTML = '<h2>Results</h2>';
    busStops = JSON.parse(busStops)
    for(const busStop of Object.keys(busStops)) {
        departureInfoHTML += printStationDepartureInfo(busStops[busStop].busStopName, busStops[busStop].departureInfo)
    }
    document.getElementById("results").innerHTML = departureInfoHTML;
}

function printStationDepartureInfo(stationName, buses) {
    let busInfo = "<h3>"+stationName+"</h3>" +
                    "<ul>";

    if (buses.length > 0){
        for (const bus of buses) {

            busInfo += "<li>" + Math.round(bus.timeToStation / 60) + " minutes: <b>"
                + bus.lineName + "</b> to " + bus.destinationName + "</li>";
        }
    } else {
        busInfo += "<li>No buses are currently due at this bus stop.</li>"
    }
    busInfo += "</ul>";
    return busInfo;
}
// SW13 9pf
