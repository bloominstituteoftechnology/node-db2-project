exports.up = function(knex) {
  return knex.schema.createTable('sales', tbl => {
    tbl.increments('receipt_id')
    tbl.foreign('receipt_id').references('cars.id')
    tbl.integer('sale_price')
    tbl.boolean('sold').defaultTo(false)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales')
};