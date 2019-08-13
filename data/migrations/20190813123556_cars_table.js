exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();

        // Changed vin to string from integer. 
        // Doing this without migrating to see if I run into any errors.
        tbl.string('vin')
            .unique()
            .notNullable();

        tbl.string('make', 40)
            .notNullable();

        tbl.string('model', 40)
            .notNullable();

        tbl.integer('mileage')
            .notNullable();

        tbl.string('transmission_type', 40);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
