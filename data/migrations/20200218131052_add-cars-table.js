exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('vin', 17).unique().notNullable().index();
      tbl.string('make', 50).notNullable();
      tbl.string('model', 50).notNullable();
      tbl.integer('mileage').notNullable();
      tbl.string('transmission', 20);
      tbl.string('status', 100);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };