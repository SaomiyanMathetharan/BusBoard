import express from 'express';
import log4js from "log4js";
import {getNearestBusStops} from "./api.js"
const router = express.Router();


router.get('/departureBoards/:postcode', (req, res) => {
    let postcode = req.params.postcode;
    res.send(getNearestBusStops(postcode));
})

export default router;

// http://localhost:3000/departureBoards/abc
// https://www.google.com/search?q=abc