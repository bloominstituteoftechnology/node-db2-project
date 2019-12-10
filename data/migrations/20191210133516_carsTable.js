
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments();
    tbl
        .string('vin')
        .notNullable()
        .unique()
        .index()
    tbl
        .string('make')
        .notNullable()
        .unique()
    tbl
        .string('model')
        .notNullable()
        .unique()
    tbl
        .string('mileage')
        .notNullable()
        .unique()
  
    
        
    })
};

exports.down = function(knex) {
  
};


The client for this API is a car dealer who has provided the following specs:

The critical information for each car is the VIN, make, model, and mileage.
They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.