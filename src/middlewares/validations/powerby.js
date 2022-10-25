const Joi = require('joi')
const { formError } = require('../../utils/errorHandling')
const { stringRequired, string } = require('./helpers/joi-composition')

const JoiValidation = {
  loadReportAad: Joi.object({
    report_id: stringRequired('Report ID')
  }),
  loadReportEmbed: Joi.object({
    group_id: stringRequired('Group ID'),
    report_id: stringRequired('Report ID'),
    dataset: stringRequired('Dataset ID'),
    username: stringRequired('Username'),
    roles: string('Roles')
  })
}

const Validation = {
  loadReportAad: async (req, res, next) => {
    try {
      await JoiValidation.loadReportAad.validateAsync(req.body)
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  loadReportEmbed: async (req, res, next) => {
    try {
      await JoiValidation.loadReportEmbed.validateAsync(req.body)
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
