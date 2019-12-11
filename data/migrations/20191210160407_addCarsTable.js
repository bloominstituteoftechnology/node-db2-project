
exports.up = function(knex) {
  return knex.schema.createTable('cars', cars => {
    cars.increments();
    cars.text('vin', 17).notNullable().unique()
    cars.text('make', 128).notNullable();
    cars.text('model', 128).notNullable();
    cars.integer('mileage', 9).notNullable();
    cars.text('transmission', 128).nullable();
    cars.text('title', 128).nullable();
  })
};

exports.down = function(knex) {
  return knex.schma.dropTableIfExists('cars');
};
