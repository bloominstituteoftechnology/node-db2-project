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
  find,
  add,
  update,
  findById
};

function find() {
  return db("zoos");
}

function findById(id) {
  return db("zoos")
    .where({ id })
    .first();
}

function add(zoo) {
  return find().insert(zoo);
}

function update(id, changes) {
  return find()
    .where({ id })
    .update(changes);
}
