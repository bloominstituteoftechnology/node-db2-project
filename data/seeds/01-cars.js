const cars = [
    {
        vin: '123456',
        make: 'mazda',
        model: '3',
        mileage: 41211,
        title: 'clean',
        transmission: 'manual',

    },

    {
        vin: '542132',
        make: 'mercedes',
        model: 's430',
        mileage: 11233,
        title: 'salvage',

    },

    {
        vin: '124651',
        make: 'acura',
        model: 'nsx',
        mileage: 12312,
        

    },
]

// exports.seed = function(knex) {
//     return knex('cars')
//     .truncate().then(() => {
//     return knex('cars').insert(cars)
//     })
// }

exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}