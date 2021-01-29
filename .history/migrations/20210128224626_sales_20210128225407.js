
const { table } = require("console");

exports.up = function(knex) {
  return knex.schema.createTable('sales', function(tbl){
      tbl.increments('order_id')
      tbl.timestamp('sell_date').defaultTo(knex.fn.now())
      tbl.text('Make')
      tbl.text('Model')
      tbl.text('VIN')
        .unique()
      tbl.text('Mileage')
      tbl.boolean('titleIsClean')

  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales')
};
