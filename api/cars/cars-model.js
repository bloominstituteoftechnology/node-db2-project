const { default: knex } = require('knex')
const db = require('../../data/db-config')

const getAll = () => {
  return db('cars')
  // DO YOUR MAGIC

}

const getById = (id) => {
  // DO YOUR MAGIC
  return db('cars').where("id", id).first()
}

const create = async ({ vin, make, model, mileage, title, transmission }) => {
  // DO YOUR MAGIC
  const [id] = await db('cars').insert({ vin, make, model, mileage, title, transmission })
  return getById(id)
}

const checkVinUnique = (vinParam) => {
  return db('cars').where({ vin: vinParam }).first()
}
module.exports = {
  getAll,
  getById,
  create,
  checkVinUnique
}
