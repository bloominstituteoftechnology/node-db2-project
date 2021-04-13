exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    // turns out that sqlite does not enforce lengths
    // it also is dynamic typed and has no problem putting '12' into an integer column
    table.increments()
    table.specificType('vin', 'CHAR(17)').unique().notNullable()
    table.string('make', 128).notNullable()
    table.string('model', 128).notNullable()
    table.integer('mileage').notNullable()
    table.string('title', 128)
    table.string('transmission', 9)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
