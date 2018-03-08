exports.up = function(knex, Promise) {
    return knex.schema.createTable('zoos', function(tbl) {
        tbl
        .increments();

        tbl
        .string('name', 255)
        .notNullable()
        .unique('name');

        tbl
        .timestamp('createdAt')
        .defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('zoos');
};
