const db = require("../../data/db-config.js")

module.exports = {
  getAll,
  getById,
  create
}

function getAll(){
  return db('cars')
}

function getById(id){
  return db('cars')
    .where({ id })
}

async function create(newCar){
  const [ id ] = await db('cars').insert(newCar)
  return getById(id) 
}
