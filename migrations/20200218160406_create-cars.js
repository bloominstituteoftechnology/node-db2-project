exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl
      .string("Vin", 256)
      .notNullable()
      .index();

    tbl.string("make", 128).notNullable();

    tbl.string("model", 256).notNullable();

    tbl.integer("mileage").notNullable();

    tbl.string("transmission", 24);

    tbl.string("condition", 256);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
