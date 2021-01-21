exports.up = function(knex) {
    return knex.schema.createTable('cars', (table) => {
          // primary key
          table.increments();
          // add not null make
          table.string('make').notNullable();
          //add model
          table.string('model').notNullable();
          //add year as float
          table.string('year').notNullable();
    })
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
  };
  