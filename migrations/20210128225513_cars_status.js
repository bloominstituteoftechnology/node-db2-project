
exports.up = async function(knex) {
  await knex.schema.alterTable("cars",(table)=>{
    table.text("transmission_type")
    table.text("title")
  })
};

exports.down = async function(knex) {
  await knex.schema.alterTable("cars",(table)=>{
    table.dropColumns("transmission_type","title")
  })
};
