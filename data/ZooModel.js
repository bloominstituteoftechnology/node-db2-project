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
  return db('zoos');
}

function findById(id) {
  return db('zoos')
    .where({ id })
    .first();
}

function add(zoo) {
  return db('zoo')
    .insert(zoo)
    .into('zoo');
}

function update(id, changes) {
  return db('zoo')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('zoo')
    .where({ id })
    .del();
}

// repository pattern for data access
