
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '1234567542', make: 'audi', model: 'A3', mileage: 54213, transmission: 'auto', status: 'clean'}

      ]);
    });
};

 