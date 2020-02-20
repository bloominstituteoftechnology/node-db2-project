
exports.up = function(knex) {
    // don't forget the return statement
    return knex.schema.createTable('cars', tbl => {
      tbl.integer('vin').primary();
      tbl.text('make', 128).notNullable();
      tbl.text('model', 128).notNullable();
      tbl.integer('mileage').notNullable();
      tbl.text('transType',  128);
      tbl.text('titleStatus', 128);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
