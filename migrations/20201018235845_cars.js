
exports.up = async function(knex) {
    await knex.schema.alterTable("cars", (table)=>{
        table.boolean("sold").default(false)
      
    })
};

exports.down = function(knex) {
  
};
