exports.up = function(knex) {
  return knex.schema.createTable('cars', (tbl) => {
    tbl.increments('id');
    tbl.integer('vin', 128).unique().notNullable();
    tbl.string('model').notNullable();
    tbl.string('make').notNullable();
    tbl.decimal('mileage').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};