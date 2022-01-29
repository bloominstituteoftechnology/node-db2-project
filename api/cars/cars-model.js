const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}

const create = (cars) => {
  const [ id ] = db('cars').insert(cars)
  return getById(id)
}

module.exports = {
  getAll, 
  getByVin,
  create,
}
