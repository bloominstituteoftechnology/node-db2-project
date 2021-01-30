
exports.up = function(knex) {
    return knex.schema.createTable('cars',tbl=>{
        tbl.increments();
        tbl.string('make',128).unique().notNullable();
        tbl.string('model',128).notNullable();
        tbl.integer('mileage').notNullable();
        tbl.text('transmission');
        tbl.string('title_status',128);
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  };
