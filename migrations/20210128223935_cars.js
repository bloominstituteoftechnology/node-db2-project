
exports.up = async function(knex) {
  await knex.schema.createTable("cars",(table)=>{
      table.increments("id")
      table.text("VIN",64).notNull().unique()
      table.text("make",128).notNull()
      table.text("model").notNull()
      table.integer("mileage").notNull()
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("cars")
};
