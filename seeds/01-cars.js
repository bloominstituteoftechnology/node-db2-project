exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          VIN: "JH4DC4450SS003654",
          make: "Toyota",
          model: "Corolla",
          mileage: "41337"
          // transmission_type: "Auto",
          // Status_of_the_title: "clean",
        },
        {
          VIN: "1FTEF17W4VNC92444",
          make: "Jeep",
          model: "Patriot",
          mileage: "56892"
          // transmission_type: "Auto",
          // Status_of_the_title: "clean",
        },
        {
          VIN: "JM3ER293490222369",
          make: "Tesla",
          model: "Model X",
          mileage: "12345"
        }
      ]);
    });
};
