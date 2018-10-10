const knex = require('knex');

const knexConfig = require('../knexfile');

const zoos = knex(knexConfig.development);

module.exports = {
    find,
    findById,
    add,
    update,
    remove,
  };
  
  function find() {
    return zoos('zoos');
  }
  
  function findById(id) {
    return zoos('zoos')
      .where({ id })
      .first();
  }
  
  function add(zoo) {
    return zoos('zoos')
      .insert(zoo)
      .into('zoos');
  }
  
  function update(id, changes) {
    return zoos('zoos')
      .where({ id })
      .update(zoos);
  }
  
  function remove(id) {
    return zoos('zoos')
      .where({ id })
      .del();
  }