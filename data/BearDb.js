const knex = require("knex");

const knexConfig = require("../knexfile.js");
const db = knex(knexConfig.development);

const find = () => {
  return db("bears");
};

const findById = id => {
  return db("bears")
    .where({ id: id })
    .first();
};

const insert = bear => {
  return db("bears").insert(bear);
};

const update = (id, bear) => {
  return db("bears")
    .where({ id })
    .update(bear);
};

const remove = id => {
  return db("bears")
    .where({ id })
    .del();
};

const getAllBearsInZoo = id => {
  return db("bears").where({ zoo_id: id });
};

module.exports = { find, findById, insert, update, remove, getAllBearsInZoo };
