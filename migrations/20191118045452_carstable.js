
exports.up = function(knex) {
  // change we want to make to our schema
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl.text('make', 15)
        .notNullable();
    tbl.text('model')
    tbl.text('VIN', 30)
        .unique();
    tbl.text('milage', 10)
        .notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
