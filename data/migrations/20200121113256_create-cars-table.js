
exports.up = function(knex) {
// The critical information for each car is the VIN, make, model, and mileage.
// They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.

    return knex.schema.createTable('cars', table=>{
        table.increments()
        table.text('VIN').unique().notNullable()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.integer('milleage').notNullable()
        table.text('transmission')
        table.text('status')

    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars') 
};
