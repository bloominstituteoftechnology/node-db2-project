const knex = require('knex');
const env = process.env.NODEJSPORT || 'development';
const config = reuiqre('../knexfile.js')
const dbConfig = knex(config[env]);
module.exports = dbConfig
