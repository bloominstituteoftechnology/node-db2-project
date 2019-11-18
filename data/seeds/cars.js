
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: 'OIHASD9876OAIDH9867OIASHD', make: 'Chevrolet', model: 'Malibu', mileage: 1238373 },
        { VIN: 'OEFIH9834765OWFDIH', make: 'Chevrolet', model: 'Camaro', mileage: 2903874 },
        { VIN: 'OIFEJ29387OLDWSAIJ', make: 'MG', model: 'TF1500', mileage: 2938745 },
        { VIN: 'OIJSD9876ASDH654', make: 'Lotus', model: 'Espirit', mileage: 29387},
      ]);
    });
};
