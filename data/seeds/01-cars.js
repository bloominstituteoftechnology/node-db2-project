// STRETCH
const cars = [
    {
        vin: '5FNRL386060B45797',
        make: 'toyota',
        model: 'prius',
        mileage: 215000,
        title: 'clean',
        transmission: 'manual'
    },
    {
        vin: '1G2ZH57N084119089',
        make: 'toyota',
        model: 'corolla',
        mileage: 115000,
        title: 'salvage'
    },
    {
        vin: '4T1BF1FK1DU239010',
        make: 'ford',
        model: 'focus',
        mileage: 15000
    },
]

exports.seed = function(knex) {
    return knex('cars')
    .insert(cars)
    .truncate().then(() => {
        return knex('cars').insert(cars)
    })
}