
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl =>{
        tbl.increments();
        
        tbl
          .string('VIN', 128)
          .notNullable()
          .unique()
          .index()
          
        tbl.string('make', 128).notNullable()
        
        tbl.string('model', 128).notNullable()

        tbl.integer('mileage', 128).notNullable()

        tbl.string('transmission', 128)
        
        tbl.boolean('title')
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
  
};
