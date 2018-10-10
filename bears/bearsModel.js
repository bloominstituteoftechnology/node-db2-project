const knex = require('knex');

const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('bears');
}

function findById(id) {
  return db('bears')
    .where({ id })
    .first();
}

function add(bear) {
  return db('bears')
    .insert(bear)
    .into('bears');
}

function update(id, changes) {
  return db('bears')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('bears')
    .where({ id })
    .del();
}
