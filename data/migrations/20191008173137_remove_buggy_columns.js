exports.up = function(knex) { 
    return knex.schema.table('cars', tbl => {
        tbl.dropColumn('transmission type');
        tbl.dropColumn('title status');
    })
};

exports.down = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.dropTableIfExists;
    })
}