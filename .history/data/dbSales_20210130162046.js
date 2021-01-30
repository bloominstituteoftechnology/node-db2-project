const db = require('./dbConfig');
const shortid = require('shortid')


function sell(sellVehicle){
    return db.insert({
        order_id: shortid.generate(),
        sell_date: knex.fn.now(),
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