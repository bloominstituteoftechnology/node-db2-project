
exports.up = async function(knex) {
  await knex.schema.createTable("cars", (table)=>{
      table.increments("id")
      table.text("vin").notNull().unique()
      table.text("make").notNull()
      table.text("model").notNull()
      table.integer("mileage").default(0)
      table.text("transType").default("auto")
      table.text("titleStatus").default("clean")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars");
};
