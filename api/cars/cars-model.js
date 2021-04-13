const db = require("../../data/db-config.js")

module.exports = {
  getAll,
  getById,
  create
}

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars')
    .where({ id })
}

const create = async (newCar) => {
  const [ id ] = db('cars').insert(newCar)
  return getById(id) 
}
