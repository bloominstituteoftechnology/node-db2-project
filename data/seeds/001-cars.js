
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: "1HGBH41JXMN109186",
          make: "bmw",
          model: "sedan",
          mileage: 5,
        }
      ]);
    });
};
