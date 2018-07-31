const config = require('../knexfile');

const knex = require('knex');

module.exports = knex(config.development); // reads config by default
