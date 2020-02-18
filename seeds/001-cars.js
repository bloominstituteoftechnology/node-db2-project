
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { vin: 854879245, make: 'honda', model: 'civic', mileage: 40000  },
        { vin: 854879243, make: 'honda', model: 'pilot', mileage: 50000, transmission: 'manual', title: 'clean'},
        { vin: 854879243, make: 'honda', model: 'shadow', mileage: 10000, transmission: 'manual', title: 'clean'}
      ]);
    });
};
