
exports.up = async function(knex) {
    await knex.schema.createTableIfNotExists('cars', table => {
        table.increments('id');
        table.text('VIN').unique().notNull();
        table.text('make').notNull();
        table.text('model').notNull();
        table.integer('mileage').notNull();
        table.text('transmission');
        table.text('titleStatus');
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists('cars');
};
