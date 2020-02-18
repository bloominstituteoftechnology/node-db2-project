
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.string('VIN', 50)
        .notNullable()
        .index()
      tbl.string('make', 50)
        .notNullable()
        .index()
      tbl.string('model', 50)
        .notNullable()
        .index()
      tbl.string('transtype', 50)
      tbl.string('titlestatus', 50)
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
