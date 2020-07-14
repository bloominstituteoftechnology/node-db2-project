const knex = require("knex");
const knexfile = require("../knexfile.js");
const knexConfig = knexfile.development;

module.exports = knex(knexConfig);
