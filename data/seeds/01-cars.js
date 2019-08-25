
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: "4652",
        make: "Tesla",
        model: "Model S",
        mileage: 0,
        transmission: "automatic",
        status: "clean"},
        {VIN: "65432",
        make: "Chevy",
        model: "Lumina",
        mileage: 150000,
        transmission: "automatic",
        status: ""},
        {VIN: "03864",
        make: "Koenigsegg",
        model: "Agera R",
        mileage: 0,
        transmission: "manual",
        status: "clean"}
      ]);
    });
};
