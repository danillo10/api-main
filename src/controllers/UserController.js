const User = require('../models/User')
const PasswordReset = require('../models/PasswordReset')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
const { serverError, formaterErrors } = require('../utils/errorHandling')
const { sendEmailRecoverPassword, sendEmailStore } = require('../utils/emails')
const Token = require('../utils/token')
const Upload = require('../utils/upload')

const Model = new User()
const PasswordResetModel = new PasswordReset()

class UserController {
  async listByFirm(req, res) {
    const { firm_id } = req.body
    try {
      const data = await Model.findAll(
        ['id', 'name', 'email', 'roles'],
        { firm_id },
        ['name', 'asc']
      )
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async show(req, res) {
    const { id } = req.params
    try {
      const data = await Model.findById(id, [
        'id',
        'name',
        'email',
        'roles',
        'file_url'
      ])
      console.log(data)
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async store(req, res) {
    const {
      firm_id,
      name,
      email,
      password,
      emailFrom,
      emailMessage,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass
    } = req.body
    const emailValues = {
      emailTo: email,
      emailFrom,
      emailMessage,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass
    }
    try {
      const salt = bcrypt.genSaltSync(16)
      const hash = bcrypt.hashSync(password, salt)
      const values = {
        firm_id: firm_id,
        name,
        email,
        roles: 'admin',
        hash
      }
      await Model.store(values)
      await sendEmailStore(emailValues)
      res.status(201).send({
        firm_id: values.firm_id,
        name: values.name,
        email: values.email,
        roles: values.roles
      })
    } catch (error) {
      serverError(res)
    }
  }

  async update(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async removeUser(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async login(req, res) {
    const { email, password } = req.body
    const token = new Token()
    try {
      const data = await Model.findByField({ email }, [
        'id',
        'name',
        'email',
        'file_url',
        'roles',
        'firm_id',
        'hash'
      ])
      if (!data) {
        return formaterErrors(res, 404, 'Usuário ou senha incorreto.')
      }
      bcrypt.compareSync(password, data.hash)
        ? res.send(token.userToken(data))
        : formaterErrors(res, 404, 'Usuário ou senha incorreto.')
    } catch (error) {
      console.log(error)
      serverError(res)
    }
  }

  async forgotPassword(req, res) {
    const { emailTo, uuid } = req.body
    try {
      await PasswordResetModel.store({ email: emailTo, token: uuid })
      await sendEmailRecoverPassword(req.body)
      res.json({
        data: { message: 'Foi enviado um email para redefinir sua senha!' }
      })
    } catch (error) {
      serverError(res)
    }
  }

  async recoverPassword(req, res) {
    const values = {}
    try {
      const salt = bcrypt.genSaltSync(16)
      values.hash = bcrypt.hashSync(req.body.password, salt)
      await Model.updateByField(
        { email: req.data.email },
        { hash: values.hash }
      )
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async uploadImage(req, res) {
    try {
      const { id } = req.params
      const { key: filename, location: file_url = '' } = req.file
      const data = await Model.findById(id, ['filename', 'file_url'])
      const upload = new Upload(data)
      upload.delete()
      await Model.updateByField({ id }, { filename, file_url })
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async updatePassword(req, res) {
    const { password } = req.body
    try {
      const salt = bcrypt.genSaltSync(16)
      const hash = bcrypt.hashSync(password, salt)
      await Model.update(req.payload.data.id, { hash })
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async storeAuthUser(req, res) {
    const {
      firm_id,
      name,
      email,
      password,
      emailFrom,
      emailMessage,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass
    } = req.body
    const emailValues = {
      emailTo: email,
      emailFrom,
      emailMessage,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass
    }
    try {
      const salt = bcrypt.genSaltSync(16)
      const hash = bcrypt.hashSync(password, salt)
      const values = {
        firm_id: firm_id,
        name,
        email,
        roles: 'user',
        hash
      }
      await Model.store(values)
      await sendEmailStore(emailValues)
      res.status(201).send({
        firm_id: values.firm_id,
        name: values.name,
        email: values.email,
        roles: values.roles
      })
    } catch (error) {
      serverError(res)
    }
  }

  async updateAuthUser(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }
}

module.exports = UserController
