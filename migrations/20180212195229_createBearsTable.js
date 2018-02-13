
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', (tbl) => {
    tbl.increments();
    tbl
    .integer('zooId')
    .unsigned()
    .references('id')
    .inTable('zoos');
    tbl
    .string('species', 80)
    .notNullable()
    .unique();
    tbl
    .string('latinName', 80)
    .notNullable();
    tbl
    .timestamp('createdOn')
    .defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('bears');
};