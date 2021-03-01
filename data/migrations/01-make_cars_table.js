// DO YOUR MAGIC
exports.up = async function(knex) {
    await knex.schema.createTable("cars", (table) => {
      //   table.integer("id").notNull().unique().primary()
      table.increments("id")
      table.text("vin").notNull().unique()
      table.text("make").notNull()
      table.text("model").notNull()
      table.real("milage").notNull()
      table.text("title")
      table.text("transmission")
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cars")
  };
  