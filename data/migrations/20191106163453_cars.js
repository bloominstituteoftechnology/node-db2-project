exports.up = function (knex) {
    return knex.schema.createTable('cars', (tbl) => {
        tbl.increments();

        tbl.string('vin', [255])
            .notNullable();
        tbl.string('make', [128])
            .notNullable();
        tbl.string('model', [128])
            .notNullable();
        tbl.integer('mileage')
            .notNullable();
        tbl.string('transmission_type', [128]);
        tbl.string('title_status', [64]);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};