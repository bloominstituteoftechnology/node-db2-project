
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN').unique().notNullable();
      tbl.string('make').notNullable();
      tbl.string('model').notNullable();
      tbl.decimal('mileage').notNullable();
      tbl.string('transmission');
      tbl.string('status');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
