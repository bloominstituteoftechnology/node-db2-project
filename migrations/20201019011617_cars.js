
exports.up = async function(knex) {
    await knex.schema.alterTable("cars", (table)=>{
        table.text("img").notNull().default("")      
    })
};

exports.down = function(knex) {
  
};