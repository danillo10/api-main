const Report = require('../models/Report')
const { serverError } = require('../utils/errorHandling')

const Model = new Report()

class ReportController {
  async listReportsByUser(req, res) {
    const { user_id } = req.body
    try {
      const data = await Model.findAllByField(
        { user_id },
        [
          'id',
          'name',
          'report_id',
          'group_id',
          'dataset_id',
          'roles',
          'page_navigation'
        ],
        ['id', 'asc']
      )
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async listReportsByUserWithCard(req, res) {
    const { user_id } = req.body
    try {
      const data = await Model.listReportsByUserId(user_id)
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async showReport(req, res) {
    const { id } = req.params
    try {
      const data = await Model.findById(id, [
        'id',
        'name',
        'report_id',
        'roles',
        'page_navigation'
      ])
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async showByReportId(req, res) {
    const { user_id, report_id } = req.body
    try {
      const data = await Model.getReportByReportIdAndUserId(report_id, user_id)
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async storeReport(req, res) {
    const {
      user_id,
      name,
      report_id,
      group_id,
      dataset_id,
      roles,
      page_navigation
    } = req.body
    const values = {
      user_id,
      name,
      report_id,
      group_id,
      dataset_id,
      roles,
      page_navigation
    }
    try {
      await Model.store(values)
      res.status(201).send(values)
    } catch (error) {
      serverError(res)
    }
  }

  async updateReport(req, res) {
    const { id } = req.params
    try {
      await Model.update(id, req.body)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }

  async deleteReport(req, res) {
    const { id } = req.params
    try {
      await Model.remove(id)
      res.sendStatus(204)
    } catch (error) {
      serverError(res)
    }
  }
}

module.exports = ReportController
