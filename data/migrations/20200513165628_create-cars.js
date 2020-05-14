
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments(); // id that autoincrements (primary key)

        tbl.string('VIN').notNullable().unique();
        tbl.string('make', 128).notNullable();
        tbl.string('model', 128).notNullable();
        tbl.integer('mileage').notNullable();

        tbl.string('transmission');
        tbl.string('status');



    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
