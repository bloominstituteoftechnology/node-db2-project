
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 26346456, make: 'toyota', model: 'corola', mileage: 1250, transmissionType: '', titleStatus:''},
        {VIN: 64357567, make: 'honda', model: 'accord', mileage: 200000, transmissionType: '6-speed manuel', titleStatus:'clean'},
        {VIN: 86746573, make: 'ford', model: 'fusion', mileage: 8050, transmissionType: '6-speed automatic', titleStatus:''}
      ]);
    });
};
