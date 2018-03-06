
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', function(tbl) {
      tbl.increment();

      tbl
      .integer('zooId')
      .unsigned()
      .references('id')
      .inTable('zoos');

      tbl
      .string('species', 80)
      .notNullable()
      .unique('species')

      tbl
      .string('latinName', 80)
      .notNullable()
      .unique('latinName');

    tbl
    .timestamp('createdAt')
    .defaultTo(knex.fn.now());
  })
};

exports.down = function(knex, Promise) {};
