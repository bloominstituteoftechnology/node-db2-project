
exports.up = function(knex) {
  return knex.schema.createTable('car-dealer', table => {
      table.increments();
      table.text('carColor', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer');
};
