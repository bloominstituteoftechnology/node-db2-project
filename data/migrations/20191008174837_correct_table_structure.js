
exports.up = function(knex) {
    return knex.schema.createTable('cars', function (tbl) {
        tbl.increments();

        tbl.string('VIN', 17).notNullable();
        tbl.string('make', 128).notNullable();
        tbl.string('model', 128).notNullable();
        tbl.integer('mileage', 6).notNullable();
        tbl.string('transmission_type', 128).notNullable();
        tbl.string('title_status', 128);
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
