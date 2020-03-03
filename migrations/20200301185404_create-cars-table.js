
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
    table.increments();
    table.TEXT('VIN', 128)
        .notNullable()
        .unique();
    table.text('make', 128)
        .notNullable();
    table.text('model', 128)
        .notNullable();
    table.integer('mileage')
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
