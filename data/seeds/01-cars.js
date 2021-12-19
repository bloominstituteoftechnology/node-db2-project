const cars = [
    {
        vin: '1111111111111',
        make: 'toyota',
        model: 'corolla', 
        milage: 432000
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: '1111111111111',
        make: 'toyota',
        model: 'prius', 
        milage: 32000
        title: 'salvage',
   
    },
    {
        vin: '1111111111111',
        make: 'ford',
        model: 'mustang', 
        milage: 2000
  
    },
]

exports.seed = function(knex){
    return knex('cars')
    .truncate()
    .then(()=> {
        return knex('cars').insert(cars)
    })
}