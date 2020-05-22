
exports.up = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.string('transmission', 128)
        tbl.string('title', 128)
    })
};

exports.down = function(knex) {
    return knex.schema.table('cars', tbl => {
        tbl.dropColumn('transmission')
        tbl.dropColumn('title')
    })
};
