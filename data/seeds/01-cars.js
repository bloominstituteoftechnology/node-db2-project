const cars = [
    {
        vin: '1231231212',
        make: 'Ford',
        model: 'Focus',
        mileage: 175000,
        title: 'fine',
        transmission: 'manual'
    },
    {
        vin: '1212312312',
        make: 'Honda',
        model: 'Civic',
        mileage: 1700,
        title: 'fine',
        transmission: 'automatic'
    },
    {
        vin: '12312312312',
        make: 'Honda',
        model: 'CRV',
        mileage: 4000,
        title: 'great',
        transmission: 'automatic'
    },
    {
        vin: '1231231231',
        make: 'Toyota',
        model: 'Rav4',
        mileage: 1,
        title: 'great',
        transmission: 'automatic'
    },
]

exports.seed = async function (knex) {
    await knex('cars').truncate()
    await knex('cars').insert(cars)
}
