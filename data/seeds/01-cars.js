const cars = [
    {
        vin: '1D4HR38N13F581006',
        make: 'toyota',
        model: 'corolla', 
        mileage: 432000,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: 'ZCFJS7458M1953433',
        make: 'toyota',
        model: 'prius', 
        mileage: 32000,
        title: 'salvage',
   
    },
    {
        vin: 'SCBBR53W36C034889',
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

exports.seed = async function(knex){
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}