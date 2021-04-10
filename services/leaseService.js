const moment = require('moment-timezone');
const { Response_Messages: M } = require('../utils/constants')


const { Frequency: F } = require('../utils/constants');
const { HandledError } = require('../utils/errorUtil');
const logger = require('../utils/logger');

class LeaseService {

    constructor(timeZone = "") {
        moment.tz.setDefault(timeZone)
        // moment().tz(timeZone).format();
        // console.log(moment().timeZone)

        var a = moment("2013-11-18 11:55")

    }

    generateLease = (startDate, endDate, frequency, weeklyRent) => {
        const accumalatorObj = this.getAccumalatorObj(frequency);


        logger.info('Accumaltor object created')
        let result = this.generateLeaseLineItems(startDate, endDate, weeklyRent, accumalatorObj)

        logger.info("Formatting line items dates and amounts")
        result = result.map(({ startDate, endDate, amount }) => ({ startDate: this.formatTimeToISOString(startDate), endDate: this.formatTimeToISOString(endDate), amount }))
        return result;
    }

    getAccumalatorObj = (frequency) => {
        let accumalatorObj = {}

        switch (frequency) {
            case F.WEEKLY:
                accumalatorObj = { accumalatorType: 'week', accumalotorValue: 1 }
                break;
            case F.FORTNIGHTLY:
                accumalatorObj = { accumalatorType: 'week', accumalotorValue: 2 }
                break;
            case F.MONTHLY:
                accumalatorObj = { accumalatorType: 'month', accumalotorValue: 1 }
                break;
            default:
                break;

        }

        return accumalatorObj
    }

    generateLeaseLineItems = (mainStartDate, mainEndDate, weeklyRent, accumalatorObj) => {
        let results = []
        const { accumalatorType, accumalotorValue } = accumalatorObj;

        if (!(accumalatorType && accumalotorValue)) {
            logger.error('Accumalator object did not properly initialised.')
            throw new HandledError('Accumalator object did not properly initialised.', M.ERROR_GET_LEDGER)
        }

        const amount = this.getAmountValue(weeklyRent, accumalatorObj)
        if (amount === null) {
            logger.error('Failed on amount calculation')
            throw new HandledError('Failed on amount calculation', M.ERROR_GET_LEDGER)
        }

        logger.info('Standard amount calculated')
        for (let m = moment(mainStartDate); m.isBefore(mainEndDate); m.add(accumalotorValue, accumalatorType)) {

            let startDate = moment(m);
            let endDate = moment(startDate).add(accumalotorValue, accumalatorType).subtract(1, 'day')

            if (endDate.isAfter(mainEndDate)) {
                logger.info("Adding line item for remainder of days")
                let item = this.getLeaseValueForRemainingDays(startDate, moment(mainEndDate), weeklyRent)
                results.push(item);
                break;
            }
            results.push({ startDate, endDate, amount })
        }
        logger.info(`Line items results generated with length of ${results.length}`)

        return results;

    }

    getAmountValue = (weeklyRent, accumalatorObj) => {
        if (weeklyRent > 0) {
            const { accumalatorType, accumalotorValue } = accumalatorObj;

            const amount = (accumalatorType === "month") ? this.getMonthlyAmount(weeklyRent) :
                (accumalatorType === "week" && accumalotorValue === 2) ? weeklyRent * 2 :
                    (accumalatorType === "week" && accumalotorValue === 1) ? weeklyRent : null

            return amount;
        }
        return null;

    }

    getLeaseValueForRemainingDays = (startDate, endDate, weeklyRent) => {
        if (startDate && endDate && weeklyRent && weeklyRent > 0) {
            let leftDays = endDate.diff(startDate, 'days') + 1;
            let amount = (weeklyRent / 7) * leftDays
            amount = this.formatAmountToTwoDecimals(amount)
            return { startDate, endDate, amount }
        }
        return null;
    }

    getMonthlyAmount = (weeklyAmount) => {
        // if (!weeklyAmount)
        //     throw new Error('Weekly amount not provided')
        let amount = (weeklyAmount / 7) * 365 / 12;
        return this.formatAmountToTwoDecimals(amount)
    }

    formatTimeToISOString = (momentTime) => {
        if (momentTime)
            return momentTime.toISOString();
    }

    formatAmountToTwoDecimals = (amount) => {
        if (amount)
            return Math.round(amount * 100) / 100
    }

}

module.exports = LeaseService;

