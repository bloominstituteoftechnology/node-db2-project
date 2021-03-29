// DO YOUR MAGIC
exports.up = function (knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id');
        tbl.string('vin').notNullable();
        tbl.string('make');
        tbl.string('model');
        tbl.decimal('mileage');
        tbl.string('title');
        tbl.string('transmission');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};