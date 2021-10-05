const cars = [
    {
        vin: '1FVACWCS96HV81220',
        make: 'Ford',
        model: 'Focus',
        mileage: 175000,
        title: 'fine',
        transmission: 'manual'
    },
    {
        vin: '3GCEC14X66G218202',
        make: 'Honda',
        model: 'Civic',
        mileage: 1700,
        title: 'fine',
        transmission: 'automatic'
    },
    {
        vin: 'JH4DC4440RS004255',
        make: 'Honda',
        model: 'CRV',
        mileage: 4000,
        title: 'great',
        transmission: 'automatic'
    },
    {
        vin: 'WVGBV7AX6CW559712',
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
