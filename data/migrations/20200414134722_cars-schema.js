
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.char('VIN', 17).unique().notNullable();
      tbl.text('Make', 128).notNullable();
      tbl.text('Model', 128).notNullable();
      tbl.numeric('Mileage');
      tbl.text('Transmission Type', 128);
      tbl.text('Title Status', 128);
  })
};

exports.down = function(knex) {
  
};
