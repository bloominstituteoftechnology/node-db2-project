
exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', (tbl) => {
    tbl.increments();
    tbl
    .string('name', 225)
    .notNullable()
    .unique('name', 'uq_zoo_name');
    tbl
    .timestamp('createdOn').defaultTo(knex.fn.now());
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('zoos')
};
