
exports.up = async function(knex) {
    await knex.schema.createTable("sales", (table)=>{
        table.increments("id")
        table.text("vin").notNull().unique()
        table.float("price").default(0)
        table.text("buyersName").notNull()
    })
  };
  
  exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("sales");
  };
  