const Joi = require('joi')
const bcrypt = require('bcrypt')
const User = require('../../models/User')
const PasswordReset = require('../../models/PasswordReset')
const Messages = require('./helpers/messages')
const { formError, formaterErrors } = require('../../utils/errorHandling')
const {
  stringRequired,
  string,
  intRequired,
  emailRequired,
  passwordConfirmation
} = require('./helpers/joi-composition')

const Model = new User()
const PasswordResetModel = new PasswordReset()

const JoiValidation = {
  store: Joi.object({
    firm_id: intRequired('Empresa'),
    name: stringRequired('Nome'),
    email: emailRequired('Email'),
    password: stringRequired('Senha'),
    emailFrom: emailRequired('Email destinatário'),
    emailMessage: stringRequired('Mensagem email'),
    smtpHost: stringRequired('Smtp host'),
    smtpPort: stringRequired('Smtp port'),
    smtpUser: stringRequired('Smtp user'),
    smtpPass: stringRequired('Smtp pass')
  }),
  storeAuthUser: Joi.object({
    firm_id: intRequired('Empresa'),
    name: stringRequired('Nome'),
    email: emailRequired('Email'),
    roles: string('permissão'),
    password: stringRequired('Senha'),
    emailFrom: emailRequired('Email destinatário'),
    emailMessage: stringRequired('Mensagem email'),
    smtpHost: stringRequired('Smtp host'),
    smtpPort: stringRequired('Smtp port'),
    smtpUser: stringRequired('Smtp user'),
    smtpPass: stringRequired('Smtp pass'),
    report_roles: string('Roles')
  }),
  update: Joi.object({
    name: stringRequired('Nome'),
    email: emailRequired('Email')
  }),
  updateAuthUser: Joi.object({
    name: stringRequired('Nome'),
    email: emailRequired('Email'),
    roles: string('Permissão')
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
    password: stringRequired('Nova Senha'),
    password_confirmation: passwordConfirmation()
  })
}

const Validation = {
  store: async (req, res, next) => {
    try {
      await JoiValidation.store.validateAsync(req.body)
      const data = await Model.findByField({ email: req.body.email }, ['id'])
      if (data) {
        formaterErrors(res, 400, 'Esse email já esta cadastrado.')
        return
      }
      next()
    } catch (error) {
      formError(res, 400, error)
    }
  },
  storeAuthUser: async (req, res, next) => {
    try {
      await JoiValidation.storeAuthUser.validateAsync(req.body)
      const data = await Model.findByField({ email: req.body.email }, ['id'])
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
  updateAuthUser: async (req, res, next) => {
    try {
      await JoiValidation.updateAuthUser.validateAsync(req.body)
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
