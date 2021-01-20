
exports.up = function(knex) {
    return knex.schema.createTable('car', table => {
        table.increments('ID');
        table.text('make').notNullable();
        table.text('model').notNullable();
        table.text('miles').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('car');
};
