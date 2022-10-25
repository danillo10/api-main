const db = require('../config/dbConnection')
const Model = require('./Model')

function Firm() {
  Model.call(this, 'firms')
}

Firm.prototype = Object.create(Model.prototype)
Object.defineProperty(Firm.prototype, 'constructor', {
  value: Firm,
  enumerable: false,
  writable: true
})

module.exports = Firm
