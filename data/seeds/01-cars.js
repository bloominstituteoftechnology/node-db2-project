
exports.seed = function (knex, Promise) {
    return knex('cars').truncate()
        .then(function () {
            // add data into insert
            return knex('cars').insert([
                { make: 'telsa', model: 'model S', VIN: '1HGBH41KXML109186', mileage: null, transmission: 'auto', title: 'clean' },
                { make: 'Chevy', model: 'Impala', VIN: '1HGJF41KXML109186', mileage: 32909, transmission: 'manual', title: 'salvaged' },
                { make: 'BMW', model: 'M3', VIN: '1HSFH41KXML109186', mileage: 75678, transmission: 'auto', title: 'clean' },
                { make: 'Audi', model: 'A4', VIN: '1HGBH41KXML239186', mileage: 8765, transmission: 'manual', title: 'clean' },
                { make: 'Ford', model: 'Mustang', VIN: '1HGBH41KXML109194', mileage: 132445, transmission: 'auto', title: 'totalled' }
            ]);
        });
};