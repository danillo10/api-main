const db = require('../config/dbConnection')
const Model = require('./Model')

function Report() {
  Model.call(this, 'reports')
}

Report.prototype = Object.create(Model.prototype)
Object.defineProperty(Report.prototype, 'constructor', {
  value: Report,
  enumerable: false,
  writable: true
})

Report.prototype.listReportsByUserId = async function (userId) {
  return await db('reports')
    .join('report_cards', 'report_cards.report_id', 'reports.report_id')
    .where({ user_id: userId })
    .select(
      'reports.id',
      'reports.name',
      'report_cards.name as card_name',
      'report_cards.file_url',
      'reports.report_id',
      'reports.group_id',
      'reports.dataset_id',
      'reports.roles',
      'reports.page_navigation'
    )
}

Report.prototype.getReportByReportIdAndUserId = async function (
  reportId,
  userId
) {
  return (
    await db('reports')
      .where({ report_id: reportId, user_id: userId })
      .select('id', 'name', 'report_id', 'roles', 'page_navigation')
  ).shift()
}

module.exports = Report
