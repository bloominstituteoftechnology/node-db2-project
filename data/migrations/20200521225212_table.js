
exports.up = function (knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN')
            .notNullable()
            .unique()
        tbl.string('model')
            .notNullable()
        tbl.string('make')
            .notNullable()
        tbl.integer('milege')
            .notNullable();
        tbl.string('transType')
        tbl.boolean('titleStatus')
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('cars');
};
