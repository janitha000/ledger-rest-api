const dotenv = require('dotenv');
const logger = require('../utils/logger');
const { prepareErrorResponse } = require('../utils/responseUtil')
const jwt = require('jsonwebtoken')

const { Response_References: R, Response_Messages: M } = require('../utils/constants')
dotenv.config();

module.exports = (req, res, next) => {
    logger.info("Verifying accesstoken")
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null)
        return res.status(401).send(prepareErrorResponse(R.UNAUTHORIZED, M.NULL_ACCESS_TOKEN))

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            logger.error('Invalid AccessToken')
            return res.status(401).send(prepareErrorResponse(R.UNAUTHORIZED, M.INVALID_ACCESS_TOKEN));
        }

        req.user = user
        next()
    })
}