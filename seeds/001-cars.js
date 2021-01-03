
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 1, make: 'rowValue1', model: 'rowValue1', mileage: 'rowValue1',transmissionType: 'rowValue1',titleStatus: 'rowValue1'},
      ]);
    });
};
