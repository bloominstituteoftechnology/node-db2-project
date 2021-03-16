// DO YOUR MAGIC
exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("car_id");
    table.string("vin").unique().notNullable();
    table.string("make").notNullable();
    table.string("model").notNullable();
    table.decimal("mileage").notNullable();
    table.string("title");
    table.string("transmission");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
