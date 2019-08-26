
exports.up = function(knex) {
  return knex.schema.createTable(
      'cars', tbl=> 
      tbl.increments
      tbl.text('VIN').unique().notNullable(),
      tbl.text('make').notNullable(),
      tbl.text('model').notNullable(),
      tbl.decimal('mileage').notNullable(),
      tbl.text('transmission-type').notNullable(),
      tbl.text('title-status').notNullable()
  )
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
