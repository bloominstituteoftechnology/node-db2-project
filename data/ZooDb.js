const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const find = () => {
  return db("zoos");
};

const findById = id => {
  return db("zoos")
    .where({ id: id })
    .first();
};

const insert = zoo => {
  return db("zoos").insert(zoo);
};

const update = (id, zoo) => {
  return db("zoos")
    .where({ id })
    .update(zoo);
};

const remove = id => {
  return db("zoos")
    .where({ id })
    .del();
};

module.exports = { find, findById, insert, update, remove };
