// STRETCH
const cars =[
    {
        vin: '32152124235',
        make: 'Toyota',
        model: 'Highlander',
        mileage: 5000,
        title: 'new',
        transmission: 'automatic'
    },
    {
        vin: '322388788',
        make: 'Toyota',
        model: 'celica',
        mileage: 252000,
        title: 'salvage',
        transmission: 'automatic'
    }
]

exports.cars = cars; 

exports.seed = function(knex, Promise){
    return knex('cars').truncate()
        .then(function() {
            return knex('cars').insert(cars);
        });
};