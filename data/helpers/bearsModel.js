const knex = require('knex')

const knexConfig = require('../../knexfile')
const db = knex(knexConfig.development)

// Data Access Layer

module.exports = {
    find,
    findById,
    add,
    update,
    remove

}

function find() {
    return db('bears')
}


function findById(id) {
    return db('bears')
        .where({ id })
        .first()
}

function add(zoo) {
    return db('bears')
        .insert(zoo)
        .into('bears')
}

function update(id, changes) {
    return db('bears')
        .where({ id })
        .update(changes)
}

function remove(id) {
    return db('bears')
        .where({ id })
        .del()
}

