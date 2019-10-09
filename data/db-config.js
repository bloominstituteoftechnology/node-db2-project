const knexfile = require('../knexfile');

const knex = require('knex');

const knexConfig = knexfile.development;

module.exports = knex(knexConfig);