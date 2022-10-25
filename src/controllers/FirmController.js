const Firm = require('../models/Firm')
const { serverError } = require('../utils/errorHandling')

const Model = new Firm()

class FirmController {
  async listFirms(req, res) {
    try {
      const data = await Model.findAll(
        ['id', 'name', 'market_name', 'cnpj'],
        {},
        ['name', 'asc']
      )
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async showFirm(req, res) {
    try {
      const data = await Model.findById(req.params.id, [
        'id',
        'name',
        'market_name',
        'cnpj'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async storeFirm(req, res) {
    const { name, market_name, cnpj } = req.body
    try {
      const values = { name, market_name, cnpj }
      await Model.store(values)
      res.status(201).send(values)
    } catch (error) {
      serverError(res)
    }
  }

  async updateFirm(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async deleteFirm(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }
}

module.exports = FirmController
