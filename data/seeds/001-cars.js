exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    knex("cars")
      // .del() // <---- changed to .truncate()
      .truncate() // resets the id (primary key) back to 1
      .then(function() {
        // Inserts seed entries
        return knex("cars").insert([
          {
            VIN: "1FAFP40674F151749",
            Make: "Ford",
            Model: "Mustang",
            Mileage: 125000,
            Transmission: "Manual",
            Title: "Clean"
          },
          {
            VIN: "1G1YY24UX55131136",
            Make: "Chevrolet",
            Model: "Corvette",
            Mileage: 109147,
            Transmission: "Automatic",
            Title: "Clean"
          },
          {
            VIN: "JHMGE88449SOOO864",
            Make: "Honda",
            Model: "Fit",
            Mileage: 182000,
            Transmission: "Automatic",
            Title: "Salvage"
          }
        ]);
      })
  );
};
