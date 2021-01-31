const knex = require('knex');
const env = process.env.NODEJSPORT || 'development';
const config = require('../knexfile.js')
const dbConfig = knex(config[env]);
module.exports = dbConfig
