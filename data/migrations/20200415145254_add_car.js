
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments('id');

      tbl.string('vin', 25)
      .notNullable()
      .unique()
      .index();

      tbl.string('make', 25)
      .notNullable()
      .index();

      tbl.string('model', 25)
      .notNullable()
      .index();

      tbl.interger('mileage')
      .notNullable()
      .index();

      tbl.string('transType', 25)
      .index();

      tbl.string('titleStatus', 128)
      .index();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
