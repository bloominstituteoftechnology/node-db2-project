// DO YOUR MAGIC
exports.up = function(knex){
    return knex.schema.createTable('cars', table =>{
        table.increments()//primary key

        //setting up the table
        table.text('vin').unique().notNullable()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.integer('mileage').notNullable()
        table.text('title')
        table.text('transmission')
    })
}
exports.down = function(knex){
    return knex.schema.dropTableIfExists('cars')
}