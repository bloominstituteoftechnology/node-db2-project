exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("sales")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("sales").insert([
        {
          car_id: 1,
          sold: true,
          seller: "Mike W.",
          buyer: "Sully",
          sold_for: 20000
        },

        {
          car_id: 2,
          sold: true,
          seller: "John Doe",
          buyer: "Jane Doe",
          sold_for: 19800
        }
      ]);
    });
};
