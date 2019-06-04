const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // required only for sqlite3
  // debug: true,
};

const db = knex(knexConfig);

module.exports = {
  find
};

function find() {
  return db("zoos");
}
