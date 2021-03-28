const db = require('../../data/db-config');

const getAll = async () => {
  // DO YOUR MAGIC
  const cars = await db('cars');
  return cars;
}

const getById = async (id) => {
  // DO YOUR MAGIC
  const car = db('cars').where({id}).first();
  return car;
}

const create = async (car) => {
  // DO YOUR MAGIC
  const carId = db('cars').insert(car);
  return await getById(carId[0]);
}

module.exports = {
  getAll,
  getById,
  create
}
