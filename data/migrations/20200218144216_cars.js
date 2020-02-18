exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id');
        tbl.string('vin').notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.string('transType');
        tbl.string('titleStatus');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };