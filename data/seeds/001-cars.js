
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '8BOD407', model: 'Civic', mileage: 30000, transmission: 'Automatic', title: 'Clean' },
        {VIN: '5WJY319', model: 'Corolla', mileage: 120000, transmission: 'Automatic', title: 'Clean' },
        {VIN: '6APK710', model: 'Sentra', mileage: 30000 },
      ]);
    });
};
