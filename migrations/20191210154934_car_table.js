exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .string("VIN")
      .notNullable()
      .unique();
    tbl.string("Make").notNullable();
    tbl.string("Model").notNullable();
    tbl.string("Mileage").notNullable();
    tbl.string("Transmission");
    tbl.string("StatusOfTitle");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
