const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)


module.exports = {
    add
}

function add (carDealer) {
const [id] = db ('carDealer').insert(carDealer)
}








