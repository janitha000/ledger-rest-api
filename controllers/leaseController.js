const LeaseService = require('../services/leaseService');
const logger = require('../utils/logger');
const { prepareResponse } = require('../utils/responseUtil');

module.exports.getLedger = (req, res, next) => {
    try {
        const { start_date, end_date, frequency, weekly_rent, timezone } = req.query;
        //query parameter validation will be already done by the validation middleware

        logger.info(`Calculating lease using parameters ${start_date}, ${end_date}, ${frequency}, ${weekly_rent}, ${timezone}`)
        const leaseService = new LeaseService(timezone);
        const lineItems = leaseService.generateLease(start_date, end_date, frequency, weekly_rent)
        logger.info(`Line items calculated with total length ${lineItems.length}`)

        const outputResponse = prepareResponse(lineItems)
        res.status(200).send(outputResponse);
    }
    catch (err) {
        logger.error("Error when getting ledger " + err)
        next(err)
    }

}