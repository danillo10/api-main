const Joi = require('joi')
const Firm = require('../../models/Firm')
const { formError, formaterErrors } = require('../../utils/errorHandling')
const { stringRequired, cnpjRequired } = require('./helpers/joi-composition')

const Model = new Firm()

const JoiValidation = {
  storeAndUpdate: Joi.object({
    name: stringRequired('Razão social'),
    market_name: stringRequired('Nome fantasia'),
    cnpj: cnpjRequired('CNPJ')
  })
}

const Validation = {
  store: async (req, res, next) => {
    try {
      await JoiValidation.storeAndUpdate.validateAsync(req.body)
      const data = await Model.findByField({ cnpj: req.body.cnpj }, ['id'])
      if (data) {
        formaterErrors(res, 400, 'Esse cnpj já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  update: async (req, res, next) => {
    try {
      await JoiValidation.storeAndUpdate.validateAsync(req.body)
      const data = await Model.findByField({ cnpj: req.body.cnpj }, ['id'])
      const firm = await Model.findById(req.params.id, ['id'])
      if (data && firm && data.id !== firm.id) {
        formaterErrors(res, 400, 'Esse cnpj já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
