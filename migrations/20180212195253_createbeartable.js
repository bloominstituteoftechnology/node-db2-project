
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Bears', tbl => {
  tbl.increments();
  tbl.primary();
  tbl.integer('zooId').unsigned().references('id').inTable('Zoos');
  tbl.string('species', 80).notNullable().unique('species');
  tbl.string('latinname', 80).notNullable().unique('latinname');
  tbl.timestamp('createdOn').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Bears');
};
