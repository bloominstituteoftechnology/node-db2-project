// STRETCH
var vinGenerator = require('vin-generator');
exports.seed = function(knex) {
    return knex('cars').truncate()
    .then(function () {
        return knex('cars').insert([
            {vin:`${vinGenerator.generateVin()}`,make:"Toyota",model:"Truck",mileage:10},
            {vin:`${vinGenerator.generateVin()}`,make:"Honda",model:"Civic",mileage:20},
            {vin:`${vinGenerator.generateVin()}`,make:"BMW",model:"Roller",mileage:30},
            {vin:`${vinGenerator.generateVin()}`,make:"Dodge",model:"Charger",mileage:40}
        ]);
    });
};