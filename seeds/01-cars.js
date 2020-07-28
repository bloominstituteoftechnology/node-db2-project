
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {Vin: 123456, make: "Ford", model: "mustang", mileage: 50000},
        {Vin: 1234567, make: "Toyota", model: "Camry", mileage: 50000},
        {Vin: 12345678, make: "Honda", model: "Civic", mileage: 50000}
      ]);
    });
};
