
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.integer("id").notNull().unique().primary().increments();
        tbl.string('VIN', 17).unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.boolean('automaticTransmission');
        tbl.string('titleStatus');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
