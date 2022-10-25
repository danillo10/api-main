const db = require('../config/dbConnection')
const Model = require('./Model')

function PasswordReset() {
  Model.call(this, 'password_resets')
}

PasswordReset.prototype = Object.create(Model.prototype)
Object.defineProperty(PasswordReset.prototype, 'constructor', {
  value: PasswordReset,
  enumerable: false,
  writable: true
})

module.exports = PasswordReset
