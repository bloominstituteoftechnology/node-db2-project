
exports.up = function(knex) {
    return knex.schema.createTable('Cars Table', table => {
        table.increments('id')
        table.text("VIN",64).notNull().unique()
        table.text("make",128).notNull()
        table.text("model").notNull()
        table.integer("mileage").notNull()
        table.text("transmission_type")
        table.text("title")

    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('Cars Table')
};
