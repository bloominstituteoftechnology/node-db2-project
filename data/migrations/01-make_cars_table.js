  
exports.up = function (knex) {
    return knex.schema
      .createTable('cars', table => {
        // primary key fruit_id integers, auto incrementing...
        table.increments('car_id')
        table.text('vin', 255).unique().notNullable()
        table.text('make').notNullable()
        table.text('model').notNullable()
        table.interger('mileage').notNullable()
        table.text('title').notNullable()
        table.text('transmission').notNullable()
      })
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('cars')
  };