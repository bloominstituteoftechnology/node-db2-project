const db = require("../../data/db-config")

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = id => {
  // DO YOUR MAGIC
  return db('cars')
    .where({ id })
    .first()
}

const create = car => {
  // DO YOUR MAGIC
  return db('cars')
    .insert(car)
    .then(foo => {
      return getById(foo[0])
    })
}


module.exports = {
  getAll,
  getById,
  create
}