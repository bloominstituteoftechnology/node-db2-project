const db = require('../../data/db-config.js')

const getAll = () => {
  return db('cars')
}

const getById = id => {
  return db('cars').where('id', id).first()
}

const create = async ({vin, make, model, mileage, title, transmission}) => {
  const [id] = await db('cars').insert({ vin, make, model, mileage, title, transmission })
  return getById(id)
}

const updateById = async (id, {vin, make, model, mileage, title, transmission}) => {
  await db('cars').where('id', id).update({vin, make, model, mileage, title, transmission})
  return getById(id)
}

const deleteById = async id => {
  const deletedAccount = await getById(id)
  await db('cars').where("id",id).delete()
  return deletedAccount
}

module.exports = {
  getAll, getById, create, updateById, deleteById
}
