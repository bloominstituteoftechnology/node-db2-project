exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', tbl => {
    tbl.increments();

    tbl
      .integer('zooId')
      .unsigned()
      .notNullable();

    tbl
      .string('species', 80)
      .notNullable()
      .unique('species');

    tbl.string('latinName', 80).notNullable();

    tbl.timestamp('createdAt').defaultTo(knex.fn.now());

    tbl
      .foreign('zooId')
      .references('id')
      .inTable('zoos');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('bears');
};
