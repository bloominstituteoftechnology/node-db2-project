exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    //  VIN, make, model, and mileage.
    tbl
      .text("VIN", 150)
      .unique()
      .notNullable();
    tbl.text("MAKE").notNullable();
    tbl.text("MODEL").notNullable();
    tbl.integer("MILEAGE").notNullable();
    // also track transmission type and status of the title (clean, salvage, etc.), but this information is not always immediately known.
    tbl.text("TRANSMISSION TYPE");
    tbl.text("TITLE STATUS");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
