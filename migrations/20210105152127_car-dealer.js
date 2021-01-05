exports.up = async function(knex) {
  await knex.schema.createTable("car-dealer", (table) => {
      table.increments("id");
      table.integer("VIN").notNull().unique();
      table.text("make").notNull();
      table.text("model").notNull();
      table.text("transmission");
      table.text("status");
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("car-dealer");
};
