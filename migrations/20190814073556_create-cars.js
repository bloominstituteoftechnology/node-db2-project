exports.up = function(knex, Promise) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.text('vin', 128).unique().notNullable();
    tbl.text('model').notNullable();
    tbl.text('make').notNullable();
    tbl.decimal('mileage').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cars');
};