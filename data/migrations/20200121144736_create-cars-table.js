
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments() // create column named "id", primary key, auto-incrementing
        table.text('make', 128).unique().notNullable()
        table.decimal('avgSpeed').notNullable()
        table.boolean('expensive')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
