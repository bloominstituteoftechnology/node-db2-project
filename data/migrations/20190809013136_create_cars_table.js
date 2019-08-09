exports.up = function(knex) {
  // we make changes to the db schema
  return knex.schema.createTable('cars', tbl => {
    // add a primary key named id, interger, auto-increment
    tbl.increments();

    // other columns
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.integer('mileage').notNullable();
    tbl
      .integer('VIN')
      .unique()
      .notNullable();
    tbl.string('transmission').notNullable();
    tbl.string('title');
  });
};

exports.down = function(knex) {
  // we undo the changes to the db schema
  return knex.schema.dropTableIfExists('cars');
};
