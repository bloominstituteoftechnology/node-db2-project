
exports.up = function(knex, Promise) {
  return knex.schema.table('courses', function(table) {
    table.boolean('finished').notNull().defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('courses', function(table) {
    table.dropColumn('finished');
  });
};