
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id')
        tbl.string('VIN', 128)
            .unique()
            .notNullable()
        tbl.string('model', 128)
        tbl.integer('mileage')
            .notNullable()
  })    
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
