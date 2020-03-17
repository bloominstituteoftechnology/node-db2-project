
exports.up = function(knex) {
  return knex.schema.createTable('cars', table => {
      table.increments();
      table.text('make', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
