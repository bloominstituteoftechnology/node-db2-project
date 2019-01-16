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
    return db('zoos');
}

function findById(id){
    return db('zoos')
           .where({ id })
           .first()
}

function add(zoo){
    return db('zoos').insert(zoo)
}

function update(id, zoo){
    return db('zoos').where({ id }).update(zoo)
}

function remove(id){
    return db('zoos').where({ id }).del()
}