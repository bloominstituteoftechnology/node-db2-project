
exports.up = async function(knex) {
await knex.schema.createTable("cars" , (table)=>{
 table.integer("id").notNull().unique().primary()
 table.integer("Vin").notNull()
 table.text("Make").notNull()
 table.text("Model").notNull()
 table.integer("Mileage").notNull()

})
  
}

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
}
