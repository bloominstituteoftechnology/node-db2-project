const db = require('../../data/db-config');

const getAll = () => {
  // DO YOUR MAGIC
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
  // DO YOUR MAGIC
  return db('cars')
    .where('id', id)
    .first()
}

const create = (car) => {
  // DO YOUR MAGIC
  // db.select('vin', 'make', 'model', 'mileage', 'title', 'transmission').from('cars')
  const cars = db.insert(car)
  console.log(cars)
    // return getById(id)
  return "hi"
}

module.exports = {
  getAll,
  getById,
  create
}