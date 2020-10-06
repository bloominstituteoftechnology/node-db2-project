const knex = require("knex");
const config = require("../knexfile");

const db = knex(config.development);

module.exports = {
  find,
  insert,
  update,
  remove,
};

function find() {
  return db("cars");
}

function insert(car) {
  return db("cars").insert(car);
}

function update(id, changes) {
  return db("cars").where({ id }).update(changes);
}

function remove(id) {
  return db("cars").where("id", id).del();
}
