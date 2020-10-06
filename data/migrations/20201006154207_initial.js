exports.up = function (knex) {
  return knex.schema.createTable("cars", function (cars) {
    cars.increments();

    cars.text("make", 128).notNullable();
    cars.text("model", 128).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
