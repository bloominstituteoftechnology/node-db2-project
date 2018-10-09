const knex = require('knex');

const knexConfig = require('./knexfile.js')
const db = knex(knexConfig.development);

module.exports = {
    get,
    getById,
    post,
    update,
    remove,
}

function get() {
    return db('zoos');
}

function getById(id) {
    return db('zoos').where(id).first();
}

function post(zoo) {
    return db('zoos').insert(zoo).into('zoos');
}

function update(id, changes) {
    return db('zoos').where({ id }).update(changes);
}

function remove(id) {
    return db('zoos').where({ id }).del();
}