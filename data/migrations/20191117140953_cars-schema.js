
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id')
    tbl.string('VIN').unique().notNullable()
    tbl.string('make', 128).notNullable()
    tbl.string('model', 128).notNullable()
    tbl.integer('mileage').notNullable()
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
