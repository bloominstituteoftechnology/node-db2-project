const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const find = (id) => {
    if(id) {
        return db('zoos').where({id}).first();
    } else {
        return db('zoos');
    }
};

const add = (zoo) => {
    return db('zoos')
        .insert(zoo)
        .into('zoos');
}
  
const update = (id, changes) => {
    return db('zoos')
        .where({id})
        .update(changes);
}
  
const remove = (id) => {
    return db('zoos')
        .where({id})
        .del();
}

module.exports = {
    find, 
    add, 
    update, 
    remove
};
