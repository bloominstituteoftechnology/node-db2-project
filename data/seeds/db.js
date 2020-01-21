const knex = require('knex');
const knexConfig = require('../../knexfile.js')
const db = knex(knexConfig.development);

module.exports = {
    find,
    insert

};


function find() {
    return db('cars');
}

function insert(cars) {
    return db('cars')
      .insert(cars)
      .then(ids => ({ id: ids[0] }));
}