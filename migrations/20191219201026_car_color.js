
exports.up = function(knex) {
  await knex.schema.createTable("cars", (table) => {
      table.increments("id")
      table.float("VIN").notNull().unique()
      table.text("make").notNull()
      table.text("model").notNull()
      table.integer("mileage").notNull()
      table.text("color")
  })
};

exports.down = function(knex) {
  await.knex.schema.dropTableIfExists("cars")
};
