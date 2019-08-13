exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('carId');
        tbl.string('VIN', 15)
            .unique()
            .notNullable();
        tbl.string('Make').notNullable();
        tbl.string('Model').notNullable();
        tbl.integer('Mileage').notNullable();
        tbl.string('Transmission Type').defaultTo('unknown');
        tbl.string('Title Status').defaultTo('unknown');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars');
};
