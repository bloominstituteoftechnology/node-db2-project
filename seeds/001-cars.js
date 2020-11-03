exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        { VIN: "asdfasdfasdfasdfasdf", Make: "Dodge", Model: "Ram", Milage: "140000" },
        { VIN: "asdfasdfasdfasdfasdf2", Make: "Dodge", Model: "Challenger", Milage: "3", Transmission: "auto", Title: "clean" }
      ]);
    });
};