
exports.up = function(knex) {
  return knex.schema.createTable('car',(table)=>{
      table.string("VIN").primary()
      table.string("Make").index().notNullable()
      table.string("Modle").index().notNullable()
      table.integer("Mileage")
      table.string("Transmission Type")
      table.string('Title Status')
  })
};

exports.down = function(knex) {
  
};
