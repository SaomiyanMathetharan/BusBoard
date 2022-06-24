import log4js from 'log4js';
import express from 'express';
import router from './router.js';
const app = express();
const port = 3000;

log4js.configure({
    appenders: {
        file: { type: 'fileSync', filename: 'logs/debug.log' }
    },
    categories: {
        default: { appenders: ['file'], level: 'trace'}
    }
});

const logger = log4js.getLogger('index.js');

app.listen(port, () => {
    logger.info('App initialised, listening on port ' + port);
    console.log(`App listening on port ${port}`)
})

app.use(express.static('frontend'));

app.use(router)






