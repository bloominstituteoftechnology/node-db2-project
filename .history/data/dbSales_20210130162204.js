const db = require('./dbConfig');


function sell(sellVehicle){
    return db.insert({
        sale_price: `${sellVehicle.value}`,
        vehicle_id: `${sellVehicle.id}`,
        Make: `${sellVehicle.Make}`,
        Model: `${sellVehicle.Model}`,
        VIN: `${sellVehicle.VIN}`,
        Mileage: `${sellVehicle.Mileage}`,
        titleIsClean: sellVehicle.titleIsClean
     })
     .into('sales');
 }
module.exports = {
    sell
}