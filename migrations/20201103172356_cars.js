exports.up = async function(knex) {
    await knex.schema.createTable("car", (table) => {
        table.increments("VIN")
        table.text("make").notNull()
        table.text("model").notNull()
        table.decimal("milage").notNull()
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("car")
  };