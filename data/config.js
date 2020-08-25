const knex = require("knex")
const knexfile = require("../knexfile")

// initiate a connection to the database,
// so we can import it into other files
module.exports = knex(knexfile)