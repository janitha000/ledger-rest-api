let Joi = require('joi')
const { min } = require('moment')
const { Frequency: F } = require('../../utils/constants')

// const JoiTimezone = require('joi-timezone');
// const Joi = BaseJoi.extend(JoiTimezone);



module.exports.getLeaseSchema = Joi.object({
    start_date: Joi.date().iso().required(),
    end_date: Joi.date().iso().required(),
    frequency: Joi.string().valid(F.WEEKLY, F.FORTNIGHTLY, F.MONTHLY).required(),
    weekly_rent: Joi.number().min(1).required(),
    timezone: Joi.string()
})

