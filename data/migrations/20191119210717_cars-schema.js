
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.string('VIN', 17).notNullable().unique();
    tbl.string('make', 15).notNullable();
    tbl.string('model', 15).notNullable();
    tbl.integer('mileage').notNullable();
    tbl.boolean('transmission');
    tbl.string('title-status');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
