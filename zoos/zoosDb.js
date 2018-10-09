const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  get,
  getById,
  add,
  remove,
  update
}

function get() {
  return db('zoos');
}

function getById(id) {
  return db('zoos')
    .where({ id })
    .first();
}

function add(zoo) {
  return db.insert(zoo)
    .into('zoos');
}

function remove(id) {
  return db('zoos')
    .where({ id })
    .del();
}

function update(id, newZoo) {
  return db('zoos')
    .where({ id })
    .update(newZoo)
}