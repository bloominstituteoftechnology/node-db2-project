exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', table => {

    table.increments();
    table.string('vin').unique().notNullable();
    table.string('make').notNullable();
    table.string('model').notNullable();
    table.string('mileage').notNullable();
    table.string('title');
    table.string('transmission');
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC

  return knex.schema.dropTableIfExists('cars');
};
