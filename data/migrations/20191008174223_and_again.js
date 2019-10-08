exports.up = function(knex) { 
    return knex.schema.dropTable('cars')
};

exports.down = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.dropTableIfExists();
    })
}