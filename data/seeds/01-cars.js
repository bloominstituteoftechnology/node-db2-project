
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: '1HGCM82633A004352', make: 'BMW', model: 'M3', mileage: '10321'},
        {VIN: '1HGCM82633A004353', make: 'Porsche', model: '911', mileage: '321'},
        {VIN: '1HGCM82633A004354', make: 'Lamborghini', model: 'Aventador', mileage: '1'},
      ]);
    });
};
