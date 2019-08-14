
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.integer('VIN').notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.decimal('milage').notNullable();
    tbl.string('transmission type', 128);
    tbl.string('title status');
  })
};

exports.down = function(knex) {
  return knex.dropTableIfExists('cars')
};
