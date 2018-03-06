
exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', function(tbl) {
      tbl
      .increments();

      tbl
      .string('name', 255)
      .notNull()
      .unique('name');

      tbl
      .timestamp('createdAt')
      .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('zoos');
};
