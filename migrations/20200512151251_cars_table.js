exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments()
        tbl.string('VIN', 255).notNullable().unique()
        tbl.string('make', 255).notNullable()
        tbl.string('model', 255).notNullable()
        tbl.integer('mileage').notNullable()
        tbl.string('transmission type', 255)
        tbl.string('title', 255)
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('cars')
  };
  