
const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('sales', function(tbl){
      tbl.increments()
        .text('order_id')
      tbl.text('Make')
      tbl.text('Model')
      tbl.text('VIN')
        .unique()
      tbl.text('Mileage')
      tbl.boolean('titleIsClean')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('car-dealer')
};
