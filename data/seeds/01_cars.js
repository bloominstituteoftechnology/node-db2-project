
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 'KNAGN4A78B516206', make: 'Buggati', model: 'Veyron', mileage: 0},
        {vin: '1M1AA12Y9WW075764', make: 'Porche', model: 'CaymanS', mileage: 0}
      ]);
    });
};


// table.string(`vin`, 128).notNullable();
// table.string(`make`, 128).notNullable();
// table.string(`model`, 128).notNullable();
// table.integer(`mileage`).notNullable();
// table.timestamps();
