const express = require('express')
const leaseRouter = express.Router();

const requestValidator = require('../middlewares/requestValidationMiddleware')
const { getLeaseSchema } = require('./validationSchemas/lease-routes-validation')

const { getLedger } = require('../controllers/leaseController')

leaseRouter.get('/ledger', requestValidator('query', getLeaseSchema), (req, res, next) => {
    return getLedger(req, res, next)
})

module.exports = leaseRouter