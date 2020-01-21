exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          vin: "2HGES15252H603204",
          make: "Nissan",
          model: "Altima",
          year: 2018,
          mileage: 101913,
          transmission_type: "automatic",
          title_status: "salvage"
        },
        {
          vin: "JH4DA9340PS000417",
          make: "Toyota",
          model: "4Runner",
          year: 2016,
          mileage: 101913,
          transmission_type: "automatic",
          title_status: "clean"
        },
        {
          vin: "1G1JF5249W7162279",
          make: "Chevrolet",
          model: "Malibu",
          year: 2017,
          mileage: 37099,
          transmission_type: "manual",
          title_status: "clean"
        }
      ]);
    });
};
