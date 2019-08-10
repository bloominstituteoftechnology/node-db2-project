
exports.up = function(knex) {
  return knex.schema.createTable( 'sales', tbl => {
    tbl.integer('id').notNullable();
    tbl.float('saleammount').notNullable();
    tbl.foreign('id').references('cars.id');
  })
};

exports.down = function(knex) {
 return knex.schema.dropTableIfExist('sales');
};
