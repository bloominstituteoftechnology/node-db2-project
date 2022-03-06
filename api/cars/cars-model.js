const db = require('../../data/db-config')

const getAll = () => {
  // DO YOUR MAGIC
  return db('cars')
}

const getById = () => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first()
}

const create = ({ vin, make, model, mileage, title, transmission }) => {
  // DO YOUR MAGIC
  const [id] = await db('accounts').insert({vin, make, model, mileage, title, transmission})
  return getById(id)
}
