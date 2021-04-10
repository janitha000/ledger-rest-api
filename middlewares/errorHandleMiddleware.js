const { GeneralError } = require('../utils/errorUtil');
const { prepareErrorResponse } = require('../utils/responseUtil')
const { Response_References: R } = require('../utils/constants')

const handleErrors = (err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).send(prepareErrorResponse(err.getReference(), err.reference, err.message))
    }

    return res.status(500).send(prepareErrorResponse(R.INTERNAL_SERVER_ERROR, err.message))
}


module.exports = handleErrors;