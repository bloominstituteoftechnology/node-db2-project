
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 1, make: "car", model: "bigcar", mileage: 5,},
      ]);
    });
};
