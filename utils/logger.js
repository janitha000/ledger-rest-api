const winston = require('winston');
const path = require('path')

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({ filename: path.join(__dirname, '../logs/api.error.log'), level: 'error' }),
        new winston.transports.File({ filename: path.join(__dirname, '../logs/api.complete.log') }),
    ],
});


if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
    }));
}


module.exports = logger;