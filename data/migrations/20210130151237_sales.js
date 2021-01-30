
exports.up = function(knex,promise) {
  return knex.schema.createTable('sales',tbl=>{
      tbl.integer('car_id').unsigned();
      tbl.foregin('car_id').references('cars.VIN')
      tbl.integer('sale_price').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('sales');
};
