const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);

module.exports = {
    find,
    findById,
    insert,
    update,
    remove,
  };
  
  function find() {
    return db('cars');
  }
  
  function findById(id) {
    return db('cars')
      .where({ id: Number(id) })
      .first();
  }
  
  function insert(car) {
    return db('cars')
      .insert(car)
      .then(ids => ({ id: ids[0] }));
  }
  
  function update(id, car) {
    return db('cars')
      .where('id', Number(id))
      .update(car);
  }
  
  function remove(id) {
    return db('cars')
      .where('id', Number(id))
      .del();
  }