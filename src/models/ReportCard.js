const db = require('../config/dbConnection')
const Model = require('./Model')

function ReportCard() {
  Model.call(this, 'report_cards')
}

ReportCard.prototype = Object.create(Model.prototype)
Object.defineProperty(ReportCard.prototype, 'constructor', {
  value: ReportCard,
  enumerable: false,
  writable: true
})

module.exports = ReportCard
