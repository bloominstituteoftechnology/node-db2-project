exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments();
    table.text("vin").unique().notNullable();
    table.text("make").notNullable();
    table.integer("mileage").notNullable();
    table.text("title");
    table.text("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropIfTableExists("cars");
};
