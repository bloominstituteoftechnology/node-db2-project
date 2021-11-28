exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable('cars', (table) => {
    table.increments()
    table.string('vin', 16).notNullable().unique()
    table.string('make', 128).notNullable()
    table.string('model', 256).notNullable()
    table.integer('mileage').unsigned().notNullable()
    table.string('title', 128)
    table.string('transmision', 128)
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};
