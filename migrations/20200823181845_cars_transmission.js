
exports.up =  async function(knex) {
    await knex.schema.alterTable("cars", (table)=>{
        table.text("Transmission")
        table.text("Title")
    })
  
};

exports.down =  async function(knex) {
    await knex.schema.alterTable("cars", (table)=>{
        table.dropColumn("Transmission")
        table.dropColumn("Title")
    })     
};
