const db = require('../config/dbConnection')
const Model = require('./Model')

function User() {
  Model.call(this, 'users')
}

User.prototype = Object.create(Model.prototype)
Object.defineProperty(User.prototype, 'constructor', {
  value: User,
  enumerable: false,
  writable: true
})

module.exports = User
