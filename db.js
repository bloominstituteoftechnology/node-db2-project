const knex = require('knex');
const knexConfig = require('./knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  insert,
  find,
  findById,
  remove,
  update
}

function find() {
  return db('zoos');
}

function findById(id) {
  return db('zoos').where({ id: Number(id) })
}

function insert(zoo) {
  return db('zoos')
    .insert(zoo)
    .then(ids => ({ id: ids[0] }))
}

function remove(id) {
  return db('zoos')
    .where('id', Number(id))
    .del();
}

function update(id, zoo) {
  return db('zoos')
    .where('id', Number(id))
    .update(zoo);
}