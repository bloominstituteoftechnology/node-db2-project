
exports.up = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.renameColumn('transmission type', 'transmission_type');
        // tbl.renameColumn('title status', 'title_status');
    })
};

exports.down = function(knex) { 
    return knex.schema.table('cars', tbl => {
        tbl.dropColumn('transmission_type');
        // tbl.dropColumn('title_status');
    })
};
