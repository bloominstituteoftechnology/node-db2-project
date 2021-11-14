exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', (table) => {
    table.increments()
    table.text('vin').notNullable().unique()
    table.text('make').notNullable()
    table.text('model').notNullable()
    table.integer('mileage').notNullable()
    table.text('title')
    table.text('transmision')
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
