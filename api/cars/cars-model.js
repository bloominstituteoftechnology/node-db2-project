const db = require("../../data/db-config")

const getAll = () => {
  return db("cars")
}

const getById = (id) => {
  return db("cars")
    .where({ id })
    .first()
}

const create = async (car) => {
  const [id] = await db("cars")
    .insert(car)

  const newCar = await db("cars")
    .where({ id })
    .first()
  
  return (id, newCar)
}

module.exports = {
  getAll,
  getById,
  create
}