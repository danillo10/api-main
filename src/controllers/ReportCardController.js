const ReportCard = require('../models/ReportCard')
const Upload = require('../utils/upload')
const { serverError } = require('../utils/errorHandling')

const Model = new ReportCard()

class ReportCardController {
  async listReportCardByFirm(req, res) {
    const { firm_id } = req.body
    try {
      const data = await Model.findAll(
        ['id', 'name', 'file_url', 'group_id', 'report_id', 'dataset_id'],
        { firm_id },
        ['id', 'asc']
      )
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async showReportCard(req, res) {
    try {
      const data = await Model.findById(req.params.id, [
        'name',
        'file_url',
        'group_id',
        'report_id',
        'dataset_id'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async storeReportCard(req, res) {
    const { firm_id, group_id, report_id, dataset_id, name } = req.body
    try {
      const values = { firm_id, group_id, report_id, dataset_id, name }
      const response = await Model.store(values)
      res.status(201).send({ id: response, ...values })
    } catch (error) {
      console.log(error)
      serverError(res)
    }
  }

  async updateReportCard(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async deleteReportCard(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async uploadReportCardImage(req, res) {
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
}

module.exports = ReportCardController
