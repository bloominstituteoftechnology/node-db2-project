
exports.up = function(knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id");

    table
        .integer("vin", 17)
        .notNullable()
    table
        .string("make")
        .notNullable()
    table
        .string("model")
        .notNullable()
    table
        .integer("mileage")
        .notNullable()
    table.string("transmission")
    table.string("title")
  })
};

exports.down = function(knex) {
  return knex.scheme.dropTableIfExists("cars")
};
