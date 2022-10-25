const Joi = require('joi')
const bcrypt = require('bcrypt')
const Admin = require('../../models/Admin')
const PasswordReset = require('../../models/PasswordReset')
const { formError, formaterErrors } = require('../../utils/errorHandling')
const {
  stringRequired,
  emailRequired,
  passwordConfirmation
} = require('./helpers/joi-composition')

const Model = new Admin()
const PasswordResetModel = new PasswordReset()

const JoiValidation = {
  firstUser: Joi.object({
    name: stringRequired('Nome'),
    email: emailRequired('Email'),
    password: stringRequired('Senha'),
    password_confirmation: passwordConfirmation()
  }),
  store: Joi.object({
    name: stringRequired('Nome'),
    emailTo: emailRequired('Email'),
    emailMessage: stringRequired('Email message'),
    emailFrom: emailRequired('Email destinatário'),
    smtpHost: stringRequired('Smtp host'),
    smtpPort: stringRequired('Smtp port'),
    smtpUser: stringRequired('Smtp user'),
    smtpPass: stringRequired('Smtp pass'),
    password: stringRequired('Senha')
  }),
  update: Joi.object({
    name: stringRequired('Nome'),
    email: emailRequired('Email')
  }),
  login: Joi.object({
    email: emailRequired('Email'),
    password: stringRequired('Senha')
  }),
  forgotPassword: Joi.object({
    uuid: stringRequired('uuid'),
    emailMessage: stringRequired('Email message'),
    emailTo: emailRequired('Email'),
    emailFrom: emailRequired('Email destinatário'),
    smtpHost: stringRequired('Smtp host'),
    smtpPort: stringRequired('Smtp port'),
    smtpUser: stringRequired('Smtp user'),
    smtpPass: stringRequired('Smtp pass')
  }),
  recoverPassword: Joi.object({
    password: stringRequired('Senha'),
    password_confirmation: passwordConfirmation()
  }),
  updatePassword: Joi.object({
    current_password: stringRequired('Senha Atual'),
    password: stringRequired('Senha'),
    password_confirmation: passwordConfirmation()
  })
}

const Validation = {
  firstUser: async (req, res, next) => {
    try {
      await JoiValidation.firstUser.validateAsync(req.body)
      const data = await Model.findAll(['id'], {}, ['name', 'asc'])
      if (data.length > 0) {
        formaterErrors(res, 400, 'Já foi cadastrado primeiro usuário.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  store: async (req, res, next) => {
    try {
      await JoiValidation.store.validateAsync(req.body)
      const data = await Model.findByField({ email: req.body.emailTo }, ['id'])
      if (data) {
        formaterErrors(res, 400, 'Esse email já esta cadastrado.')
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
      const data = await Model.findByField({ email: req.body.email }, ['id'])
      const user = await Model.findById(req.params.id, ['id'])
      if (data && user && data.id !== user.id) {
        formaterErrors(res, 400, 'Esse email já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  login: async (req, res, next) => {
    try {
      await JoiValidation.login.validateAsync(req.body)
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      await JoiValidation.forgotPassword.validateAsync(req.body)
      const data = await Model.findByField({ email: req.body.emailTo }, ['id'])
      if (!data) {
        formaterErrors(res, 404, 'Email incorreto.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  recoverPassword: async (req, res, next) => {
    try {
      await JoiValidation.recoverPassword.validateAsync(req.body)
      const data = await PasswordResetModel.findByField(
        { token: req.params.token },
        ['email', 'token']
      )
      if (!data) {
        formaterErrors(res, 404, 'Token incorreto.')
        return
      }
      req.data = data
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  updatePassword: async (req, res, next) => {
    try {
      await JoiValidation.updatePassword.validateAsync(req.body)
      const data = await Model.findById(req.payload.data.id, ['id', 'hash'])
      if (!bcrypt.compareSync(req.body.current_password, data.hash)) {
        formaterErrors(res, 404, 'Senha atual incorreta.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  }
}

module.exports = Validation
