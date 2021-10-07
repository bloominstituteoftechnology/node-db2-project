const knex = require('knex');
const configs = require('../knexfile.js');
const environment = process.env.NODE_ENV || 'development';

module.exports = knex(configs[environment]);

//alternative
//module.exports = kenx(config.development)


