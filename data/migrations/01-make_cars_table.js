// DO YOUR MAGIC
exports.up = knex => {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments();
        tbl.string('vin').unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.string('title').defaultTo(null);
        tbl.string('transmission').defaultTo(null);
    });
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('cars');
};