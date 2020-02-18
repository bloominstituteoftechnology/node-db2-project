const knex = require('knex');
const config = require('./knexfile');

// knex expects a config object
module.exports = knex(config.development);