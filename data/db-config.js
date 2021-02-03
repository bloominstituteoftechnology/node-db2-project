const knex = require('knex');
const config = require('../knexfile.js')

const configuredKnex = knex(config.development);

module.exports = db;