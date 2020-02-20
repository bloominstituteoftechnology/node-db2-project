const knex = require('knex');
const config = require('../knexfile.js');
const db = knex(config.development);

module.exports = {
  getAll,
  getByVin,
  insert
};

function getAll() {
    return db('cars');
}

function getByVin(vin) {


    return db('cars')
      .where({ vin: Number(vin) })
      .first();

}

function insert(car) {
    console.log(car);
    return db('cars')
      .insert(car)
      .then(vins => ({ vin: vins[0] }));
}