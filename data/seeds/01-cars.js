exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "JN8AT2MV4LW101092",
          make: "nissan",
          model: "rogue",
          mileage: 11617,
          transmission: "automatic",
          status: "clean"
        },
        {
          vin: "JN1BV7ARXFM421907",
          make: "infiniti",
          model: "q50",
          mileage: 15573,
          transmission: "automatic",
          status: "clean"
        },
        {
          vin: "SHHFK8G70JU203249",
          make: "honda",
          model: "civic type r",
          mileage: 15573,
          transmission: "manual",
          status: "clean"
        },
        {
          vin: "WBA5A7C51GG148787",
          make: "BMW",
          model: "5 series",
          mileage: 27216,
          transmission: "automatic",
          status: "clean"
        }
      ]);
    });
};
