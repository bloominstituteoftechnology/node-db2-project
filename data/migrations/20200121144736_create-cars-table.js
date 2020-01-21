
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments() // create column named "id", primary key, auto-incrementing
        table.decimal('vin').unique().notNullable()
        table.text('make', 128).unique().notNullable()
        table.text('model').notNullable()
        table.decimal('millage')
        table.boolean('expensive')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
