const knex = require('knex')

const { NODE_DB_HOST, NODE_DB_USER, NODE_DB_PASSWORD, NODE_DB_DATABASE } =
  process.env

const db = knex({
  client: 'mysql2',
  connection: {
    host: NODE_DB_HOST,
    user: NODE_DB_USER,
    password: NODE_DB_PASSWORD,
    database: NODE_DB_DATABASE,
    requestTimeout: 600000
  }
})

module.exports = db
