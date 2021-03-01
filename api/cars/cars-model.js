const knex = require("knex")

const db = knex()

const getAll = () => {
  db.select("*").from("cars")
}

const getById = id => {
  db.select("*").from("cars").where(id)
}

const create = async newCar => {
  await db("cars").insert(newCar)
}

module.exports = {
  getAll,
  getById,
  create
}