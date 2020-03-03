
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '1HGBH41JXMN109186', make: 'Mazda', model: 'Protege', mileage: 186575 },
        { VIN: '4BLDW55NKXV540451', make: 'Honda', model: 'Civic', mileage: 150942 }
      ]);
    });
};
