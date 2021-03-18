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

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first();
};

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}