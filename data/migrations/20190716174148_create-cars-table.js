
exports.up = function (knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('vin', 128).unique().notNullable;
        tbl.string('make').notNullable;
        tbl.string('model').notNullable;
        tbl.string('transmission');
        tbl.decimal('mileage').notNullable;
        tbl.string('title');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableExist('cars')

};
