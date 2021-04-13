
exports.up = function(knex) {
  return knex.schema.createTable("cars", table => {
    table.increments(); // creates primary key, defaults to id
    table.string('vin').notNullable().unique();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.decimal('mileage').notNullable();
    table.string('title');
    table.string('transmission');
  });
}

exports.down = function(knex) {
  return knex.schema.dropTable("cars");
}