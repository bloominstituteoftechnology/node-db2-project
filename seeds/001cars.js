
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: '0123456', make: 'Ford', model: 'Mustang', mileage: 10752, transmission: null, title: null },
        {id: 2, VIN: '02123465', make: 'Honda', model: 'CRV', mileage: 101752, transmission: null, title: null },
        {id: 3, VIN: '0101234', make: 'Ford', model: 'Mustang', mileage: 10752, transmission: null, title: null },
        {id: 4, VIN: '01010132', make: 'Ford', model: 'Mustang', mileage: 10752, transmission: null, title: null },
        {id: 5, VIN: '030303130', make: 'Ford', model: 'Mustang', mileage: 10752, transmission: null, title: null },
        {id: 6, VIN: '093513213', make: 'Ford', model: 'Mustang', mileage: 10752, transmission: null, title: null },
      ]);
    });
};
