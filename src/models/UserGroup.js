const db = require('../config/dbConnection')
const Model = require('./Model')

function UserGroup() {
  Model.call(this, 'users_groups')
}

UserGroup.prototype = Object.create(Model.prototype)
Object.defineProperty(UserGroup.prototype, 'constructor', {
  value: UserGroup,
  enumerable: false,
  writable: true
})

module.exports = UserGroup
