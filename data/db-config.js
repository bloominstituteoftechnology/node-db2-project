const knex = require('knex');
const config = require('../knexfile');
const db = config.development;
module.exports = knex(db);