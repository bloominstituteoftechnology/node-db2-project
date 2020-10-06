const Knex = require("knex");
const knexfile = require("../knexfile");

const environment = process.env.NODE_ENV || "development";

const config = knexfile[environment];

module.exports = Knex(config);
