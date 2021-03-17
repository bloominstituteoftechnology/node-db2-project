const db = require('../../data/db-config.js')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id',id).first()
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create
}