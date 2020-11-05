const knex = require('knex');

const knexfile = require('../knexfile.js');

// we must select the development object from our knexfile
const knexConfig = knexfile.development;

// export for use in codebase
module.exports = knex(knexConfig);