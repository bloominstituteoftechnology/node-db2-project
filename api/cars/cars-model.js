const knex = require('./../../data/db-config');

const getAll = async () => {
  // DO YOUR MAGIC
  const allCars = await knex
    .from('cars')
    .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission');

  return allCars;
}

const getById = async (id) => {
  // DO YOUR MAGIC

  // Returns an array with one result if found
  const car = knex
    .from('cars')
    .where({ id })
    .select('id', 'vin', 'make', 'model', 'mileage', 'title', 'transmission');

  return car[0];
}

// NOTE: There may be a better way to do this, but we created this extra
// method to satisfy our middleware "vin unique" by querying for cars with
// the provided vin
//
// Should return an empty array if there are no matches
const getByVin = async (vin) => {
  const carsWithVin = knex
    .from('cars')
    .where({ vin })
    .select('id');

  return carsWithVin;
}

const create = ({ vin, make, model, mileage, title, transmission }) => {
  // DO YOUR MAGIC
  const insertResult = knex('cars')
    .insert({ vin, make, model, mileage, title, transmission });

  return insertResult;
}


module.exports = {
  getAll,
  getById,
  create,
  getByVin
}