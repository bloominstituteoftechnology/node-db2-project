const knex = require('knex');

const knexfile = require('../knexfile.js');

//configure a connection to the database
const knexConfig = knexfile.development;

//db represents a live connection to the db
module.exports = knex(knexConfig);