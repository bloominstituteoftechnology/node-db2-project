const db = require('../../data/db-config.js')

const getAll = () => {
  return db("cars").orderBy("id", "asc")
}

const getById = id => {
  return db("cars").where("id", id).first()
}

const create = car => {
  return db("cars").insert(car)
}

module.exports = {
  getAll,
  getById,
  create,
}