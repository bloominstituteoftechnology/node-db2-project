const dbConfig = require('./knexfile');

const knex = require('knex');
const db = knex(dbConfig.development);

module.exports = {
  find,
  findById,
  create,
  update,
  remove
};

function find() {
  return db('zoos');
}

function findById(id) {
  return db('zoos')
    .where({ id })
    .first();
}

function create(zoo) {
  return db('zoos').insert(zoo);
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
