import express from 'express';
import log4js from "log4js";
import {getNearestBusStops} from "./api.js"
const router = express.Router();


router.get('/departureBoards/:postcode', async (req, res) => {
    let postcode = req.params.postcode;
    let busStops = await getNearestBusStops(postcode)
    res.send(busStops);
})

export default router;

// http://localhost:3000/departureBoards/abc
// https://www.google.com/search?q=abc