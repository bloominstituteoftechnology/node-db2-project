const db = require('../../data/db-config');

module.exports = {
    get,
    getById,
    create,
    update,
    remove
}

async function get(){
    const accounts = await db('cars')
    return accounts;
}

async function getById(vin){
    const car = await db('cars').where({vin})
    return car;
}

async function create(data){
    // returns an id
    const car = await db('cars').insert(data)
    return car
}

async function update(id,changes){
    // returns the number of items updated
    const car = await db('cars').where({VIN:id}).update(changes)
    return car;
}

async function remove(id){
    const car = await db('cars').where({VIN:id}).del();
    return car;
}