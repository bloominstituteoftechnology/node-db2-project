
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('carr').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('carr').insert([
        {VIN: 12345678, make: 'FORD', model: "FOCUS", meilage: "100,000",},
        {VIN: 77543211, make: 'FORD', model: "TAURUS", meilage: "120,000",},
        {VIN: 54321111, make: 'TOYOTA', model: "CAMRY", meilage: "50,000",},
        {VIN: 12654389, make: 'HONDA', model: "", meilage: "10,000",}
      ]);
    });
};