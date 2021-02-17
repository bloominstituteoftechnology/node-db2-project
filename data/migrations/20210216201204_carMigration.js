exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments();
    table.integer("VIN").notNullable();
    table.string("Make", 255).notNullable();
    table.string("Model", 255).notNullable();
    table.integer("Miles").notNullable();
    table.string("transmission type");
    table.string("Status of title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
