const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
  // DO YOUR MAGIC
}

const getById = (id) => {
  return db('cars').where('id', id).first()
  // DO YOUR MAGIC
}

const create = async (car) => {
  const [id] = await db('cars').insert(car, ['id'])
  return getById(id)
  // DO YOUR MAGIC
}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}

module.exports = { getAll, getById, create, getByVin }
