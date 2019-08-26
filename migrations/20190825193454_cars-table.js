
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id');
        tbl.text('make', 30).notNullable();
        tbl.text('model' , 30).notNullable();
        tbl.text('VIN').unique().notNullable();
        tbl.integer('mileage',10);
        tbl.text('transmition');
        tbl.text('title');
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };
  