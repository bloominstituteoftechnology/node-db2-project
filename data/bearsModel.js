const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const find = (id) => {
    if(id) {
        return db('bears').where({id}).first();
    } else {
        return db('bears');
    }
};

const add = (bear) => {
    return db('bears')
        .insert(bear)
        .into('bears');
}
  
const update = (id, changes) => {
    return db('bears')
        .where({id})
        .update(changes);
}
  
const remove = (id) => {
    return db('bears')
        .where({id})
        .del();
}

module.exports = {
    find, 
    add, 
    update, 
    remove
};
