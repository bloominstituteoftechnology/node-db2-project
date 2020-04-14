exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments('id');
    tbl.string('make', 50).notNullable().index();
    tbl.string('model', 50).notNullable();
    tbl.integer('year', 4).index();
    tbl.string('VIN', 50);
    tbl.integer('mileage', 6);
    tbl.string('transmission', 12);
    tbl.string('title_status', 12);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};