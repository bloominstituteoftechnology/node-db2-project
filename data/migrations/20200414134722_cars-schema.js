
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN').unique().notNullable();
      tbl.text('Make', 128).notNullable();
      tbl.text('Model', 128).notNullable();
      tbl.integer('Mileage');
      tbl.text('Transmission Type', 128);
      tbl.text('Title Status', 128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
