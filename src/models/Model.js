const db = require('../config/dbConnection')

function Model(table) {
  this.table = table
}

Model.prototype.findAll = async function (fieldArray, whereObject, orderBy) {
  return await db(this.table)
    .column([...fieldArray])
    .select()
    .where(whereObject)
    .orderBy(...orderBy)
}

Model.prototype.findById = async function (id, fieldArray) {
  return (
    await db(this.table)
      .column([...fieldArray])
      .select()
      .where({ id })
  ).shift()
}

Model.prototype.findAllByField = async function (
  whereObject,
  fieldArray,
  orderBy
) {
  return await db(this.table)
    .column([...fieldArray])
    .select()
    .where(whereObject)
    .orderBy(...orderBy)
}

Model.prototype.findByField = async function (whereObject, fieldArray) {
  return (
    await db(this.table)
      .column([...fieldArray])
      .select()
      .where(whereObject)
  ).shift()
}

Model.prototype.store = async function (values) {
  const response = await db(this.table).insert(values)
  return response.shift()
}

Model.prototype.update = async function (id, values) {
  return await db(this.table)
    .update({ ...values, updated_at: new Date() })
    .where({ id })
}

Model.prototype.updateByField = async function (whereObject, values) {
  return await db(this.table)
    .update({ ...values, updated_at: new Date() })
    .where(whereObject)
}

Model.prototype.remove = async function (id) {
  return await db(this.table).del().where({ id })
}

module.exports = Model
