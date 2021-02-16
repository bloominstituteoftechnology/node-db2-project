const knex = require("knex");
const config = require('../knexfile')

const db = knex(process.env.NODE_ENV==="production" ? config.production : config.development);

module.exports = db;