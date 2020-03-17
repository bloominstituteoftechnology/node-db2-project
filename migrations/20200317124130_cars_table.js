exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    //     The critical information for each car is the VIN, make, model, and mileage.
    tbl.increments();

    tbl
      .string("VIN", 250)
      .notNullable()
      .unique()
      .index();
    
    tbl
      .string("make", 250)
      .notNullable()
      .index();
    
    tbl
      .string("model", 250)
      .notNullable()
      .index();
    
    tbl
      .integer("mileage", 250)
      .notNullable()
      .index();

    // They also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.
    tbl
      .string("transmission type")
      .index();
    
    tbl
      .string("title status")
      .index();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
