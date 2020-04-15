exports.up = function(knex) {
    // REMEMBER THE return
    return knex.schema.createTable("cars", tbl => {
      // id column, integer, primary key, auto-increment
      tbl.increments();
  
      tbl.string("VIN", 17);
  
      tbl.string("Make").index();
  
      tbl.string("Model").index();
  
      tbl.integer("Mileage");
  
      tbl.string("Transmission").index();
  
      tbl.string("Title").index();
  
      // adds created_at and updated_at columns
      tbl.timestamps(true, true);
    });
  };
  
  // undo the changes from the up function (rollback)
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
  };