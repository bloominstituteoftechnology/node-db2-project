// the changes we want to make 
exports.up = function(knex) {
    // create  a cars table
    // define the schema
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('vin', 17). unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.string('transmission').notNullable();
        tbl.string('status').notNullable();
    });
  
};
// undoes the changes
exports.down = function(knex) {
  // drop the cars table
  return knex.schema.dropTableIfExists('cars');
};
