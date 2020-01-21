const db = require('../data/db-config');

function getCars(){
    return db('cars')
}

function getCarById(id){
    return db('cars').where({id}).first();
}
module.exports={
    getCars,
    getCarById
}