
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
  //Create VIN (id)
    tbl.increments();
  //Create make
    tbl
    .string('Make', 35)
    .notNullable();
  //Create model
    tbl
    .string('Model', 35)
    .notNullable();
  //Create mileage
    tbl
    .integer('Mileage');
  //Transmission type
    tbl
    .string('Transmission', 15)
  //Title Status
    tbl
    .string('Title', 15)
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};