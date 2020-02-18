exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex("carsManager")
      .truncate() // empties the table and resets the id back to 1
      .then(function() {
        const cars = [
          {
            VIN: 1234,
            CarMake: "Ford",
            CarModel: "Mustang",
            CarMiles: 80000,
            TransType: "Manual",
            TransStatus: "Good"
          },
          {
            VIN: 1234,
            CarMake: "Honda",
            CarModel: "Civic",
            CarMiles: 3000000,
            TransType: "Manual",
            TransStatus: "so-so"
          },
          {
            VIN: 1234,
            CarMake: "Fiat",
            CarModel: "Deathbox",
            CarMiles: 20000,
            TransType: "automatic",
            TransStatus: "alien tech"
          },
        ];
        // Inserts seed entries
        return knex("carsManager").insert(cars);
      });
  };