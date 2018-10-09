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

function add(animaleName) {
  return db('zoos')
    .insert(animaleName)
    .into('zoos');
}

function update(id, changes) {
  return db('zoos')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return db('zoos')
    .where({ id })
    .del();
}