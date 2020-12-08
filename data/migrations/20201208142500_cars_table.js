
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
    table.increments();
    table.text('VIN', 128).unique().notNullable();
    table.text('Make', 128).notNullable();
    table.text('Model', 128).notNullable();
    table.integer('Milage', 128).notNullable();
    table.text('Transmission', 128)
    table.text('Title', 128)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
