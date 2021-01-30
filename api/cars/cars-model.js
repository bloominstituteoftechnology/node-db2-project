const db = require('../../data/db-config');

module.exports = {
    get,
    create,
}

async function get(){
    const accounts = await db('cars')
    return accounts;
}

async function create(data){
    // returns an id
    const car = await db('cars').insert(data)
    return car
}