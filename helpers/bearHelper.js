const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  insert,
  find,
  findById,
  remove,
  update
}

function find() {
  return db('bears');
}

function findById(id) {
  return db('bears').where({ id: Number(id) })
}

function insert(bear) {
  return db('bears')
    .insert(bear)
    .then(ids => ({ id: ids[0] }))
}

function remove(id) {
  return db('bears')
    .where('id', Number(id))
    .del();
}

function update(id, bear) {
  return db('bears')
    .where('id', Number(id))
    .update(bear);
}