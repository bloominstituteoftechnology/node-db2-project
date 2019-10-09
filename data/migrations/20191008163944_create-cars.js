
exports.up = function(knex) {
  return knex.schema.createTable("cars", function(tbl) {
    tbl.increments();

    tbl.string('model', 128).notNullable();
    tbl.string('VIN').notNullable().unique();
    tbl.string('make', 128).notNullable();
    tbl.integer('Milage').notNullable();
    tbl.string('transmission_type');
    tbl.integer('title_status');
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');

};
