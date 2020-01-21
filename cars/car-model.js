const db = require('../data/db-config');

function getCars(){
    return db('cars')
}

function getCarById(id){
    return db('cars').where({id}).first();
}
function addNewCar({VIN, make, model, milleage, transmission, status}){
    return db('cars').insert({ VIN, make, model, milleage, transmission, status
    })
}
module.exports={
    getCars,
    getCarById,
    addNewCar
}