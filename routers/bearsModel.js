const knex = require('knex');

const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

module.exports = {
    getAll,
    findById,
    add,
    update,
    remove
}

function getAll(){
    return db('bears');
}

function findById(id){
    return db('bears')
           .where({ id })
           .first()
}

function add(bear){
    return db('bears').insert(bear)
}

function update(id, bear){
    return db('bears').where({ id }).update(bear)
}

function remove(id){
    return db('bears').where({ id }).del()
}