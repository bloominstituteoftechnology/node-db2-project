// DO YOUR MAGIC
exports.up = function (knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('vin').notNullable();
        tbl.string('make');
        tbl.string('model');
        tbl.integer('mileage');
        tbl.string('title');
        tbl.string('transmission');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};