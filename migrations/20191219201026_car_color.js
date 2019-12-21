
exports.up = function(knex) {
  await knex.schema.createTable("care", (cars) => {
      table.increments("id")
      table.float("VIN").notNull().unique()
      table.text("make")
      table.text("model")
      table.integer("mileage")
      table.text("color")
  })
};

exports.down = function(knex) {
  await.knex.schema.dropTableIfExists("cars")
};
