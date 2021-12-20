const cars = [
    {
        vin: '11111111111111111',
        make: 'toyota',
        model: 'corolla', 
        mileage: 432000,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: '11111111111111112',
        make: 'toyota',
        model: 'prius', 
        mileage: 32000,
        title: 'salvage',
   
    },
    {
        vin: '11111111111111113',
        make: 'ford',
        model: 'mustang', 
        mileage: 2000
  
    },
]

exports.seed = function(knex){
    return knex('cars')
    .truncate()
    .then(()=> {
        return knex('cars').insert(cars)
    })
}

// exports.seed = async function(knex){
    // await knex('cars').truncated()
    // await knex('cars').insert(cars)
// }