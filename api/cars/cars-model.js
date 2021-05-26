const db = require('../../data/db-config');

const getAll = () => {
  const cars = db('cars');
  return cars;
};

const getById = id => {
  const car = db('cars').where({id});
};

const create = async car => {
  const newCar = db('cars').insert(car);
  return newCar;
};

module.exports = {
  getAll,
  getById,
  create
};