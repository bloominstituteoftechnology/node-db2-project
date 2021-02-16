exports.up = function (knex) {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id");
    table.text("VIN", 64).notNull().unique();
    table.text("make", 128).notNull();
    table.text("model").notNull();
    table.integer("milage").notNull();
  });
};

exports.down = function (knex) {
    knex.schema.dropTableIfExists("cars")
};
