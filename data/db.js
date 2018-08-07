//allows for knex to be configured in one place

const config = require('../knexfile');

const knex = require('knex');

module.exports = knex(config.development); 