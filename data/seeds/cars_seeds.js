
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          id: 1, 
          make: "Toyota",
          model: "Tundra"
        },
        {
          id: 2,
          make: "Ford",
          model: "Mustang"
        }
      ]);
    });
};
