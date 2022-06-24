import {question} from 'readline-sync';
import log4js from 'log4js';
import express from 'express'
import router from './router.js'
const app = express()
const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

app.use(router)

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'warn'}
    }
});

const logger = log4js.getLogger('index.js');

logger.info("Asking user for postcode");
// const postcode = question('Please type a postcode.\n').trim();
// getNearestBusStops(postcode) //NW51TL


