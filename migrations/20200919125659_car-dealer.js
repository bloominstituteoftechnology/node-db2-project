
exports.up = function(knex) {
    return knex.schema.createTable('carSpecs', tbl => {
        tbl.increments('id');
        tbl.decimal('VIN').unique().notNullable();
        tbl.string('Make', 128).notNullable();
        tbl.string('Model', 128).notNullable();
        tbl.decimal("Mileage").notNullable();
        tbl.string("Transmission", 128);
        tbl.string('Title', 128);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('carSpecs');
};
