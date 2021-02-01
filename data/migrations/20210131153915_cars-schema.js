
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id')


    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('fruits')
  
};
