exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('cars')
        .truncate()
        .then(function() {
            // Inserts seed entries
            return knex('cars').insert([
                {
                    VIN: 'W83JCH38KSNC92845D',
                    Make: 'Jeep',
                    Model: 'Grand Cherokee',
                    Mileage: 1500,
                },
                {
                    VIN: '82JDHVNA9234JDIS',
                    Make: 'Chrysler',
                    Model: '200',
                    Mileage: '92500',
                    'Transmission Type': 'V4',
                    'Title Status': "Clean"
                },
            ]);
        });
};
