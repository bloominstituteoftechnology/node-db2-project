// DO YOUR MAGIC
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('vin').notNullable().unique();
      tbl.decimal('make').notNullable();
      tbl.decimal('model').notNullable();
      tbl.decimal('mileage').notNullable();
      tbl.decimal('title');
      tbl.decimal('transmission');
    });
  };