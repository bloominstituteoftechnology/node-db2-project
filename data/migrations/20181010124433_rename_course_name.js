
exports.up = function(knex, Promise) {
  return knex.schema.table('courses', function(courses) {
    courses.renameColumn('name', 'firstName')
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('courses', function(courses) {
    courses.renameColumn('firstName', 'name')
  });
};
