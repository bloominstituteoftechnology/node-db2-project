const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where('id', id).first()
}

const getByVin = (vin) => {
  return db('cars').where('vin', vin).first()
}

const create = async () => {
  // DO YOUR MAGIC
  const [ id ] = await db('cars').insert(car)
  const post = await getById(id)
  return post
}
module.exports = {
  getAll, 
  getById,
  create,
  getByVin,
}