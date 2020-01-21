
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();

      tbl.integer('VIN').unique();

      tbl.string('make').notNullable();

      tbl.string('model').notNullable();

      tbl.integer('mileage');

      tbl.string('transmission type');

      tbl.string('status of title');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
