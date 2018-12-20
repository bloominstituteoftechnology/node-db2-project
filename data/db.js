const knex = require('knex')
const dbConfig = require('../knexfile')

const db = knex(dbConfig.development)

module.exports ={ 
  find,
  findByID,
  insert,
  update,
  remove
}

function find() {
  return db('zoos')
}

function findByID(id) {
  return db('zoos').where('id', id)
}

function insert(animal) {
  return db('zoos').insert(animal)
}

function update(id, change) {
  return db('zoos').where('id', id).update(change)
}

function remove(id) {
  return db('zoos').where('id', id).del()
}