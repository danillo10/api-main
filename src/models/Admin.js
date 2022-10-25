const db = require('../config/dbConnection')
const Model = require('./Model')

function Admin() {
  Model.call(this, 'admins')
}

Admin.prototype = Object.create(Model.prototype)
Object.defineProperty(Admin.prototype, 'constructor', {
  value: Admin,
  enumerable: false,
  writable: true
})

module.exports = Admin
