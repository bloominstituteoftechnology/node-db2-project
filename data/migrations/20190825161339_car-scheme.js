
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('make', 70).notNullable();
    tbl.text('model', 70).notNullable();
    tbl.integer('year', 4).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
