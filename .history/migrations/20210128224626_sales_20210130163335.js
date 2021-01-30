
const { table } = require("console");
const shortid = require('shortid')
exports.up = function(knex) {
  return knex.schema.createTable('sales', function(tbl){
      tbl.increments('order_id')
        .unique()
      tbl.timestamp('sell_date')
        .defaultTo(knex.fn.now())
      tbl.integer('sale_price')
      tbl.integer('vehicle_id')
        .unique()
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
