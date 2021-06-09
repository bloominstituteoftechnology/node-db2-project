// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema.createTable('cars', table => {
        table.increments('id')

        table.text('vin', 128).unique().notNullable()
        table.text('make', 128).notNullable()
        table.text('model', 128).notNullable()
        table.real('mileage', 128).notNullable()
        table.text('title', 128)
        table.text('transmission', 128)
    })
}
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
}