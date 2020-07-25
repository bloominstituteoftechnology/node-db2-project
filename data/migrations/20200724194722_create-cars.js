
exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.text('VIN', 128).unique.notNullable();
        tbl.text('Make', 128).notNullable();
        tbl.text('Model', 128).notNullable();
        tbl.interger('Milage').notNullable();
        tbl.text('Transmission');
        tbl.text('Title');
    })
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cars')
};
