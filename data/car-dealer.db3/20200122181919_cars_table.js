
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.string('make', 75).index();

      tbl.string('vin', 75).index();

      tbl.integer('mileage');

      tbl.string('model', 75).index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
