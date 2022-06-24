import axios from "axios";
import log4js from "log4js";

const logger = log4js.getLogger('Postcode API Client');

export function getPostcodeLocation (postcode) {
    logger.info("Retrieving postcode longitude and latitude");
    return axios.get('http://api.postcodes.io/postcodes/' + postcode)
        .then((response) => [response.data.result.latitude, response.data.result.longitude])
        .catch((error) => {
            logger.warn("Error retrieving postcode: " + error.response.data.error);
            return Promise.reject(error.response.data.error);
        })
}