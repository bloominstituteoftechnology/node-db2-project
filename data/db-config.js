const knex = require('knex');

const knexConfig = require('../knexfile.js');

const configuredKnex = knex(knexConfig.development);

module.exports = configuredKnex;