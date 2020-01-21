
exports.up = function (knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('VIN', 17).unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.boolean('automaticTransmission');
        tbl.string('titleStatus');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('cars');
};



// - The critical information for each car is the VIN, make, model, and mileage.
// - They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.