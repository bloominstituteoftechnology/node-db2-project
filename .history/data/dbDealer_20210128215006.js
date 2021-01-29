const db = require('./dbConfig');

module.exports = {
    get,
    getByID,
    insert

}


function get (){
    return db.select('*').from('car-dealer')
} 

function getByID(id){
    return db.select('*').from('car-dealer').where({'id': id})
}

function insert(newVehicle){
    db.insert({
        Make: `${newVehicle.Make}`,
        Model: `${newVehicle.Model}`,
        VIN: `${newVehicle.VIN}`,
        Mileage: `${newVehicle.Mileage}`,
        titleIsClean: newVehicle.titleIsClean
    })
    .into('car-dealer');
}