const { Response_References: R } = require('./constants')

module.exports.prepareResponse = (responseData) => {
    let outputResponse = {};
    outputResponse['reference'] = R.SUCCESS;
    outputResponse['data'] = responseData;


    return outputResponse
}

module.exports.prepareErrorResponse = (reference, errorReference, message) => {
    let outputResponse = {};
    outputResponse['reference'] = reference;
    outputResponse['data'] = {
        error: errorReference,
        errorDetails: message
    };


    return outputResponse
}