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

const getById = () => {
  
}

const create = () => {
  
}

module.exports = {
  getAll,
  getById,
  create
}