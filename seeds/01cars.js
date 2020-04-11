
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 12345678, Make: 'FORD', model: "FOCUS", meilage: "100,000",},
        {VIN: 77543211, Make: 'FORD', model: "TAURUS", meilage: "120,000",},
        {VIN: 54321111, Make: 'TOYOTA', model: "CAMRY", meilage: "50,000",},
        {VIN: 12654389, Make: 'HONDA', model: "", meilage: "10,000",}
      ]);
    });
};
