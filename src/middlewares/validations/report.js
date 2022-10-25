const Joi = require('joi')
const { formError } = require('../../utils/errorHandling')
const {
  stringRequired,
  string,
  intRequired,
  int,
  boolean
} = require('./helpers/joi-composition')

const JoiValidation = {
  store: Joi.object({
    user_id: intRequired('User ID'),
    name: stringRequired('Nome'),
    report_id: stringRequired('Report ID'),
    group_id: stringRequired('Group ID'),
    dataset_id: stringRequired('Dataset ID'),
    roles: string('Roles'),
    report_card_id: int('Report Card'),
    page_navigation: boolean('Page Navigation')
  }),
  update: Joi.object({
    roles: string('Roles'),
    page_navigation: boolean('Page Navigation')
  })
}

const Validation = {
  store: async (req, res, next) => {
    try {
      await JoiValidation.store.validateAsync(req.body)
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  update: async (req, res, next) => {
    try {
      await JoiValidation.update.validateAsync(req.body)
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
