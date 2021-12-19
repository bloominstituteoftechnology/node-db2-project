const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id)
  .first()
}

const create = async (car) => {
  const [id] = await db('cars').insert(car)
  .then(([id]) => {
    return getById(id)
  })
}

const getByVin = async (vin) => {
  return db('cars').where('vin', vin)
  .first()
}

module.exports = {getAll, getById, create, getByVin}