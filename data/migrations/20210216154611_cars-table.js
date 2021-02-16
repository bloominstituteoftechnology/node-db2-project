
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id')


    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruits')
};
