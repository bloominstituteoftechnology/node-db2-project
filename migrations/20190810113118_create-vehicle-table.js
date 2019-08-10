
exports.up = function(knex) {
  return knex.schema.createTable('vehicles', tbl => {
      tbl.increments();
      tbl.text('make', 128)
      .notNullable();
      tbl.text('model', 128)
      .notNullable();
      tbl.text('condition', 128)
      tbl.integer('year',4)
      .notNullable();
      tbl.integer('miles', 128)
      tbl.text('title', 128)
      tbl.boolean('automatic-transmission')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('vehicles')
};
