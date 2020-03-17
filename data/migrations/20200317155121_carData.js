
exports.up = function(knex) {
  return knew.schema.createTable('carData', table => {
      table.increments();
      table.text('registration', 128).unique().notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('registration');
};
