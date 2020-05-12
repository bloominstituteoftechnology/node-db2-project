exports.up = function (knex) {
  return knex.schema.createTable('cars', (tbl) => {
    //add an id column that auto-increments
    tbl.increments(); //primary key
    //VIN
    tbl.text('vinNumber', 17).unique().notNullable();
    //make
    tbl.string('make', 255).notNullable();

    //model
    tbl.string('model', 255).notNullable();

    //mileage
    tbl.string('mileage', 255).notNullable();

    //transmission
    tbl.string('transmission', 255);

    // title
    tbl.string('title', 255);
  });
};

// how to undo changes => knex migrate:rollback
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
