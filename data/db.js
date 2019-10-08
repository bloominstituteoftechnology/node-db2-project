const knex = require('knex');
const KnexConfig = require('../knexfile.js');

const db = knex(knexConfig.development)

module.exports = db;