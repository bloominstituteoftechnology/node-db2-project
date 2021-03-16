// STRETCH
exports.seed = knex => {
    return knex('cars').truncate()
        .then(() => {
            return knex('cars').insert([
                {
                    vin: '0B28',
                    make: 'Chrysler',
                    model: 'PT Cruiser',
                    mileage: 2,
                    title: 'N/A',
                    transmission: 'Automatic'
                },
                {
                    vin: 'SHAW0V32',
                    make: 'Jaguar',
                    model: 'XJ8-L',
                    mileage: 10000,
                    title: 'Testy McTesterton'
                },
                {
                    vin: '0BV1',
                    make: 'Toyota',
                    model: 'Corolla',
                    mileage: 69,
                    transmission: 'Manual'
                }
            ]);
        });
};