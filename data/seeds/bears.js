exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("bears")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("bears").insert([
        { id: 1, name: "bear 1", zoo_id: 1 },
        { id: 2, name: "bear 2", zoo_id: 2 },
        { id: 3, name: "bear 3", zoo_id: 3 }
      ]);
    });
};
