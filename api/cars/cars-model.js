const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()

}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}


const create = (car) => {
  // DO YOUR MAGIC
  return db('cars').insert(car)
  .then(([id])=>{
    return getById(id)
  })
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
}