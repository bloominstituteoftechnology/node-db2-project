// STRETCH

exports.seed = function (knex) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert([
        {
          vin: "SCBFR7ZA5CC072256",
          make: "Ford",
          model: "Bronco",
          mileage: 123456,
          title: "salvage",
          transmission: "manual",
        },
        {
          vin: "SCBFR7ZA5CC072257",
          make: "Toyota",
          model: "Camry",
          mileage: 654321,
          title: "clean",
          transmission: "manual",
        },
        {
          vin: "SCBFR7ZA5CC072258",
          make: "Lexus",
          model: "ES",
          mileage: 987654,
          title: "clean",
          transmission: "automatic",
        },
      ]);
    });
};
