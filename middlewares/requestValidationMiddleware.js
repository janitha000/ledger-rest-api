const Joi = require('joi')
const { prepareErrorResponse } = require('../utils/responseUtil')
const { Response_References: R } = require('../utils/constants')

module.exports = (property, schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req[property])

        if (error) {
            const errMessage = error.details[0].message;
            let errorResponseObj = prepareErrorResponse(R.BAD_REQUEST, errMessage)
            return res.status(400).send(errorResponseObj);
        }
        else {
            return next()
        }
    }
}