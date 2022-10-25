const axios = require('axios')
const qs = require('qs')
const { serverError } = require('../utils/errorHandling')
const LoadPowerBiHeader = require('../utils/loadPowerBiHeader')

class PowerBiController {
  async loadPowerBiGroups(req, res) {
    try {
      const loadPowerBiHeader = new LoadPowerBiHeader(req)
      const { headers } = await loadPowerBiHeader.handle()
      const data = await axios.get(
        'https://api.powerbi.com/v1.0/myorg/groups',
        headers
      )
      res.send(data.data.value)
    } catch (error) {
      serverError(res)
    }
  }

  async loadPowerBiReports(req, res) {
    const { id } = req.params
    try {
      const loadPowerBiHeader = new LoadPowerBiHeader(req)
      const { headers } = await loadPowerBiHeader.handle()
      const data = await axios.get(
        `https://api.powerbi.com/v1.0/myorg/groups/${id}/reports`,
        headers
      )
      res.send(data.data.value)
    } catch (error) {
      serverError(res)
    }
  }

  async loadReportAad(req, res) {
    const { report_id } = req.body
    try {
      const loadPowerBiHeader = new LoadPowerBiHeader(req)
      const { headers, auth } = await loadPowerBiHeader.handle()
      // const report = await axios.get(`https://api.powerbi.com/v1.0/myorg/groups/${group_id}/reports/${report_id}`, headers)
      const report = await axios.get(
        `https://api.powerbi.com/v1.0/myorg/reports/${report_id}`,
        headers
      )
      const data = {
        accessToken: auth.data.access_token,
        embedUrl: report.data.embedUrl,
        reportId: report_id
      }
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }

  async loadReportEmbed(req, res) {
    const { group_id, report_id, dataset, username, roles } = req.body
    try {
      const loadPowerBiHeader = new LoadPowerBiHeader(req)
      const { headers } = await loadPowerBiHeader.handle()
      const reportValues = qs.stringify({
        accessLevel: 'View',
        identities: [
          {
            username: username,
            reports: [report_id],
            roles: roles.split(','),
            datasets: [dataset]
          }
        ]
      })
      const embedToken = await axios.post(
        `https://api.powerbi.com/v1.0/myorg/groups/${group_id}/reports/${report_id}/GenerateToken`,
        reportValues,
        headers
      )
      const report = await axios.get(
        `https://api.powerbi.com/v1.0/myorg/groups/${group_id}/reports/${report_id}`,
        headers
      )
      const data = {
        embedToken: embedToken.data.token,
        embedUrl: report.data.embedUrl,
        reportId: report_id
      }
      res.send(data)
    } catch (error) {
      serverError(res)
    }
  }
}

module.exports = PowerBiController
