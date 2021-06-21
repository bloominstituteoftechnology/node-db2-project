const db = require("../../data/db-config")

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

//obviously need to toss an id into this function
const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars')
    .where({id})
    .first()
}

const create = async (car) => {
  // DO YOUR MAGIC
  const [id] = await db('cars')
    .insert(car)

  const newCar = await db('cars')
      .where({id})
      .first()

  return (id, newCar)
}

module.exports = {
  getAll,
  getById,
  create
}