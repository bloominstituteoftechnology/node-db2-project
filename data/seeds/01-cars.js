// STRETCH
const cars = [
    {
        vin: '57566876999',
        make: 'toyota',
        model: 'rav4',
        mileage: 250000,
        title: 'clean',
        transmission: 'Automatic',
    },
    {
        vin: '57566876999',
        make: 'toyota',
        model: '4Runner',
        mileage: 50000,
        title: 'salvage',
    },
    {
        vin: '57566876999',
        make: 'jeep',
        model: 'grand cherokee',
        mileage: 5000,
    },
]

exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
  }
