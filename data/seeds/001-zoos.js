exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  // truncate resets ids back to 1
  return knex("zoos")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("zoos").insert([
        { name: "breed" }, // 1
        { name: "age" }, // 2
        { name: "weight" } // 3
      ]);
    });
};
