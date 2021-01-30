const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('car-dealer', function(tbl){
      tbl.increments()
      tbl.text('Make')
      tbl.text('Model')
      tbl.integer('value')
      tbl.text('VIN')
        .unique()
      tbl.text('Mileage')
      tbl.boolean('titleIsClean')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer')
};
