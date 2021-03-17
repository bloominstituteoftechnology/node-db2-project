const db = require('../../data/db-config.js')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id',id).first()
}

// QUESTION: why did we need async here?
const create = async (car) => {
  // DO YOUR MAGIC

  const [id] = await db('cars').insert(car,['id'])
  return getById(id)
  
}

module.exports = {
  getAll,
  getById,
  create
}