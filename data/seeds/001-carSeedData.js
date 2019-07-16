
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 'JHMRA1840SC038782', make: 'Seed1', model: 'Seed1Model', mileage:123456},
        {vin: '2CTFLXEC5B6314478', make: 'Seed2', model: 'Seed2Model', mileage:123456},
        {vin: '1FTSE34S3WHB97103', make: 'Seed3', model: 'Seed3Model', mileage:123456},
      ]);
    });
};
