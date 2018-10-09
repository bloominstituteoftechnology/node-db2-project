const knex = require('knex');

const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
    add,
    find,
    findById,
    remove,
    update,   
}

function find() {
    return db('zoos');
}

function findById(id) {
    return db('zoos')
    .where({ id })
    .first();
}

function add(zoo) {
    return db('zoos')
    .insert(zoo)
    .into('zoos');
}

function update(id, changes) {
    return db('zoos')
    .where({ id })
    .update(changes);
}

function remove(id) {
    return db('zoos')
    .where({ id })
    .del();
}