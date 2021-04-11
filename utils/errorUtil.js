const { Response_References: R } = require('../utils/constants')


class GeneralError extends Error {
    constructor(message, reference) {
        super();
        this.message = message;
        this.reference = reference;
    }

    getCode() {
        if (this instanceof NotFound) {
            return 404;
        }
        return 500;
    }

    getReference() {
        if (this instanceof NotFound) {
            return R.NOT_FOUND;
        }
        if (this instanceof HandledError) {
            return R.INTERNAL_SERVER_ERROR;
        }
        return R.INTERNAL_SERVER_ERROR;
    }
}

class NotFound extends GeneralError { }
class HandledError extends GeneralError { }

module.exports = {
    GeneralError,
    NotFound,
    HandledError
};