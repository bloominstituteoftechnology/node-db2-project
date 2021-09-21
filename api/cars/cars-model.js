const db = require('../../data/db-config') // config creates one particular db wrapper depending on the env

const getAll = () => {
  return db('cars')
}

const getById = () => {
  // DO YOUR MAGIC
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
}