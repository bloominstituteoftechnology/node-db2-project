
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
      tbl.increments();
      tbl.string('name', 25).uniqure().notNullable();
      tbl.decimal('averageOz');
      tbl.boolean('delicious');
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('fruits');
  
};
