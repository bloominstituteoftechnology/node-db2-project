
exports.up = function(knex) {
  return knex.schema.createTable('fruits', tbl => {
      tbl.increments();
      tbl.string('name', 25).notNullable().unique();
      tbl.decimal('avgWeightOz').notNullable();
      tbl.boolean('isDelicious');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('fruits');

};
