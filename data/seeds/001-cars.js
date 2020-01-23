exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("cars").insert([
        {
          make: "2000",
          model: "toyota",
          VIN: "6666",
          mileage: "400",
          transmission: "auto",
          title_status: "clean",
        },
        {
          make: "2001",
          model: "toyota",
          VIN: "6667",
          mileage: "400",
          transmission: "auto",
          title_status: "clean",
        },
        {
          make: "2002",
          model: "toyota",
          VIN: "6668",
          mileage: "400",
          transmission: "auto",
          title_status: "clean",
        }
      ]);
    });
};
