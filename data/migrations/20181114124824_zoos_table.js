
exports.up = function(knex, Promise) {
  // makes changes to the database
  return knex.schema.createTable('zoos', function(tbl) {
      tbl.increments() // generate an id field auto increments + primary key
      tbl.string('name', 255);

      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  // undo the changes to the database "ROLLBACK"
  return knex.schema.dropTableIfExists('zoos')
};
