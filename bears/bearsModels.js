const knex = require('knex');

const knexConfig = require('../knexfile.js');
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

function add(bearName) {
  return db('bears')
    .insert(bearName)
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