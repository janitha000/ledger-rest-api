const { createLogger, format, transports } = require('winston');
const path = require('path')
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] [${level.toUpperCase()}]: ${message}`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        label({ label: 'LEASE' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: path.join(__dirname, '../logs/api.error.log'), level: 'error' }),
        new transports.File({ filename: path.join(__dirname, '../logs/api.complete.log') }),
    ],
});


if (process.env.NODE_ENV !== 'production') {

    logger.add(new transports.Console({

    }));
}


module.exports = logger;