exports.up = function(knex) {
    return knex.schema.createTable("car-dealer", tbl => {
        //create a prinary key that auto increments
        tbl.increments("id");
        //add a string column, max 17 chars, will not allow dupes, is required
        tbl.string("VIN", 17)
        .unique()
        .notNullable();
        //add a string for the make with the max 50chars, dupes allowed, required  
        tbl.string("Make", 50)
        .notNullable();
        //add a string for the Model with the max 50chars, dupes allowed, required  
        tbl.string("Model", 50)
        .notNullable();
        //add a integer for the Mileage with no max, dupes allowed, required  
        tbl.integer("Mileage")
        .notNullable();
        //add a string for the Transmission_type with the max 30chars, NOT required 
        tbl.string("Transmission_type", 30)
        //add a string for the Car_status with the max 128chars NOT required 
        tbl.string("Car_status", 128)
    })
  };

exports.down = function(knex, Promise) {
    // drops the entire table
    return knex.schema.dropTableIfExists('car-dealer');
  };


