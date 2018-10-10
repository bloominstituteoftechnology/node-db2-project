
exports.up = function(knex, Promise) {
  return knex.schema.createTable('courses', function(table) {
    // primary key called id
    table.increments(); // defaults to an id with auto increments.
    table.string('name', 255).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('courses');
};
