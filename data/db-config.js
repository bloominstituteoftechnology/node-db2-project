const knex = require ("knex");

const config = require ("../knexfile");
db =knex(config.development);
module.exports = db;