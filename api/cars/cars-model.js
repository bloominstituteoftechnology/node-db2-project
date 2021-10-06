const db = require('../../data/db-config');

const getAll = () => {
  return db('cars')
    .select(
      'vin',
      'make',
      'model',
      'mileage',
      'title',
      'transmission' 
    )
}

const getById = (id) => {
  return db('cars')
    .where('id', id)
    .first()
}

const create = async (car) => {
  const [id] = await db('cars')
    .insert(car)
    return getById(id)
}

const getByVin = (vin) => {
  return db('cars')
    .where('vin', vin)
    .first()
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin
}