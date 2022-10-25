const Account = require('../models/Account')
const { serverError } = require('../utils/errorHandling')

const Model = new Account()

class AccountController {
  async listAccountsByFirm(req, res) {
    const { firm_id } = req.body
    try {
      const data = await Model.findAll(
        ['id', 'client_id', 'username'],
        { firm_id },
        ['id', 'asc']
      )
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async showAccount(req, res) {
    try {
      const data = await Model.findById(req.params.id, [
        'id',
        'client_id',
        'username'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async storeAccount(req, res) {
    const { firm_id, client_id, username, password } = req.body
    try {
      const values = { firm_id, client_id, username, password }
      await Model.store(values)
      res.status(201).send(values)
    } catch (error) {
      serverError(res)
    }
  }

  async updateAccount(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async deleteAccount(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }
}

module.exports = AccountController
