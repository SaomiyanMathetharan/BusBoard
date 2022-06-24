import express from 'express';
import log4js from "log4js";
import {getDeparturesForNNearestBusStops} from "./api.js"
const router = express.Router();

const logger = log4js.getLogger('Router');

router.get('/departureBoards/:postcode', async (req, res) => {
    let postcode = req.params.postcode;
    logger.info("Received postcode " + postcode + " from client");
    let busStops = await getDeparturesForNNearestBusStops(postcode, 2).catch((error) => {res.send(error)});
    logger.info("Received departure information from server");
    logger.trace(busStops);
    res.send(busStops);
})

export default router;

// http://localhost:3000/departureBoards/abc
// https://www.google.com/search?q=abc