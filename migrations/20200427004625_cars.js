exports.up = async function (knex) {
  await knex.schema.createTable("cars", (table) => {
    // table.integer("id").notNull().primary()
    table.increments("ID");
    table.text("VIN").notNull().unique();
    table.integer("Year").notNull();
    table.text("Make").notNull();
    table.text("Model").notNull();
    table.integer("Mileage").notNull();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("cars");
};
