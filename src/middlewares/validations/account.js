const Joi = require('joi')
const Account = require('../../models/Account')
const { formError, formaterErrors } = require('../../utils/errorHandling')
const { intRequired, stringRequired } = require('./helpers/joi-composition')

const Model = new Account()

const JoiValidation = {
  store: Joi.object({
    firm_id: intRequired('Empresa'),
    client_id: stringRequired('Client ID'),
    username: stringRequired('Username'),
    password: stringRequired('Password')
  }),
  update: Joi.object({
    client_id: stringRequired('Client ID'),
    username: stringRequired('Username'),
    password: stringRequired('Password')
  })
}

const Validation = {
  store: async (req, res, next) => {
    try {
      await JoiValidation.store.validateAsync(req.body)
      const data = await Model.findByField({ username: req.body.username }, [
        'id'
      ])
      if (data) {
        formaterErrors(res, 400, 'Esse username já está cadastrado.')
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
      const data = await Model.findByField({ username: req.body.username }, [
        'id'
      ])
      const account = await Model.findById(req.params.id, ['id'])
      if (data && account && data.id !== account.id) {
        formaterErrors(res, 400, 'Esse email já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
