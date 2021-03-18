// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema.createTable('cars', (table) =>{
        table.increments('id')
        table.integer('VIN').unique().notNullable()
        table.string('Make', 255).notNullable()
        table.string('Model', 255).notNullable()
        table.integer('Miles').notNullable()
        table.string('Transmission')
        table.string('Title Status')
    })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
}