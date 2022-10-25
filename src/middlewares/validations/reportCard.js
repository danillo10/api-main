const Joi = require('joi')
const ReportCard = require('../../models/ReportCard')
const { formError } = require('../../utils/errorHandling')
const { stringRequired, intRequired } = require('./helpers/joi-composition')
const { formaterErrors } = require('../../utils/errorHandling')

const Model = new ReportCard()

const JoiValidation = {
  store: Joi.object({
    firm_id: intRequired('Empresa'),
    group_id: stringRequired('Group ID'),
    report_id: stringRequired('Report ID'),
    dataset_id: stringRequired('Dataset ID'),
    name: stringRequired('name')
  }),
  update: Joi.object({
    group_id: stringRequired('Group ID'),
    report_id: stringRequired('Report ID'),
    dataset_id: stringRequired('Dataset ID'),
    name: stringRequired('name')
  })
}

const Validation = {
  store: async (req, res, next) => {
    try {
      await JoiValidation.store.validateAsync(req.body)
      const data = await Model.findByField({ report_id: req.body.report_id }, [
        'id'
      ])
      if (data) {
        formaterErrors(res, 400, 'Esse relatório já está cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  update: async (req, res, next) => {
    try {
      await JoiValidation.update.validateAsync(req.body)
      const data = await Model.findByField({ report_id: req.body.report_id }, [
        'id'
      ])
      const reportCard = await Model.findById(req.params.id, ['id'])
      if (data && reportCard && data.id !== reportCard.id) {
        formaterErrors(res, 400, 'Esse relatório já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
