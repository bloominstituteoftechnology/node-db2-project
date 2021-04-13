
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '12345678901234567', make: 'honda', model: '2005 oddesy', mileage: 120000},
        {vin: '22345678901234567', make: 'ford', model: 'the flying one', mileage: 0, title: 'idk', transmission: 'automatic'},
      ]);
    });
};
