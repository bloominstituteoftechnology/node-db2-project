
exports.up = function(knex, Promise) {
  return knex.schema.createTable('bears', function(tbl){
    tbl.increments('id');
    tbl.integer('zooId')
      .notNullable()
      .references('id')
      .inTable('zoos');
    tbl.string('species', 80).notNullable().unique(['species', 'uq_bear_species']);
    tbl.string('latinName', 80).notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTableIfExists('bears');
};
