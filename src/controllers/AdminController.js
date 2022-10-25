const Admin = require('../models/Admin')
const PasswordReset = require('../models/PasswordReset')
const bcrypt = require('bcrypt')
const { serverError, formaterErrors } = require('../utils/errorHandling')
const Token = require('../utils/token')
const Upload = require('../utils/upload')
const { sendEmailRecoverPassword, sendEmailStore } = require('../utils/emails')

const Model = new Admin()
const PasswordResetModel = new PasswordReset()

class AdminController {
  async list(req, res) {
    try {
      const data = await Model.findAll(['id', 'name', 'email'], {}, [
        'name',
        'asc'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async show(req, res) {
    try {
      const data = await Model.findById(req.params.id, [
        'id',
        'name',
        'email',
        'file_url'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async store(req, res) {
    const {
      name,
      emailTo,
      password,
      emailMessage,
      emailFrom,
      smtpHost,
      smtpPort,
      smtpUser,
      smtpPass
    } = req.body
    try {
      const valuesEmail = {
        emailTo,
        password,
        emailFrom,
        emailMessage,
        smtpHost,
        smtpPort,
        smtpUser,
        smtpPass
      }
      await sendEmailStore(valuesEmail)

      const salt = bcrypt.genSaltSync(16)
      const hash = bcrypt.hashSync(password, salt)
      const values = { name, email: emailTo, hash }
      console.log(values)
      await Model.store(values)

      res.status(201).send({ name: values.name, email: values.email })
    } catch (error) {
      console.log(error)
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

  async delete(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
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

  async login(req, res) {
    const { email, password } = req.body
    try {
      const token = new Token()
      const data = await Model.findByField({ email }, [
        'id',
        'name',
        'email',
        'file_url',
        'hash'
      ])

      if (!data) {
        return formaterErrors(res, 404, 'Usuário ou senha incorreto.')
      }
      if (!bcrypt.compareSync(password, data.hash)) {
        return formaterErrors(res, 404, 'Usuário ou senha incorreto.')
      }
      return res.send(token.adminToken(data))
    } catch (error) {
      return serverError(res)
    }
  }

  async forgotPassword(req, res) {
    const { uuid, emailTo } = req.body
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

  async firstUser(req, res) {
    const { name, email, password } = req.body
    const salt = bcrypt.genSaltSync(16)
    const values = { name, email, hash: bcrypt.hashSync(password, salt) }
    const token = new Token()
    try {
      const data = await Model.store(values)
      const tokenValues = {
        id: data.id,
        name: values.name,
        email: values.email,
        file_url: ''
      }
      res.send(token.adminToken(tokenValues))
    } catch (error) {
      console.log(error)
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
      formaterErrors(res, 500, error)
    }
  }
}

module.exports = AdminController
