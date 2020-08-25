
exports.up = async function(knex) {
    await knex.schema.alterTable("cars", (table)=>{
        table.dropColumn("Car Title")
    })
  
};

exports.down = async function(knex) {
  await knex.schema.alterTable("cars", (table)=>{
      table.text("Car Title")
  })
};
