// STRETCH
exports.seed = knex => {
    return knex('cars').truncate()
        .then(() => {
            return knex('cars').insert([
                {
                    vin: '0B28',
                    make: 'PT Cruiser',
                    model: '2007',
                    mileage: 2,
                    title: 'N/A',
                    transmission: '?'
                },
                {
                    vin: '0V32',
                    make: 'Jaguar',
                    model: '2006',
                    mileage: 10000,
                    title: 'Testy McTesterton'
                },
                {
                    vin: '0BV1',
                    make: 'Car',
                    model: '2167',
                    mileage: 69,
                    transmission: 'Sure'
                }
            ]);
        });
};