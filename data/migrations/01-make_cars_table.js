// DO YOUR MAGIC

// does the structural changes to the db
exports.up = function (knex) {  
    return knex.schema
      .createTable('cars', table => {
        table.increments('id') // primary key
        table.text('vin').unique().notNullable()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.integer('mileage').notNullable()
        table.text('title')
        table.text('transmission')
      })
  };
  
  // undoes those changes
  exports.down = function (knex) {
  
    return knex.schema
      .dropTableIfExists('cars')
  };
  