
exports.up = function(knex) {
    return knex.schema.createTable('cars', (tbl) => {
        tbl.increments();
        tbl.integer('VIN').unique().notNullable();
        tbl.text('make', 128).notNullable();
        tbl.text('model', 128).notNullable();
        tbl.integer('mileage').notNullable();
        tbl.text('transmissionType', 128);
        tbl.text('titleStatus');

    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
  
};
