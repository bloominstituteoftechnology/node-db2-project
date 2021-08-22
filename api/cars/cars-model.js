const db = require('../../data/db-config.js')

const getAll = () => {
  return db('cars')
}

const getById = id => {
  return db('cars').where('id', id).first()
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll, getById, create,
}
