const db = require('../config/dbConnection')
const Model = require('./Model')

function Account() {
  Model.call(this, 'accounts')
}

Account.prototype = Object.create(Model.prototype)
Object.defineProperty(Account.prototype, 'constructor', {
  value: Account,
  enumerable: false,
  writable: true
})

module.exports = Account
