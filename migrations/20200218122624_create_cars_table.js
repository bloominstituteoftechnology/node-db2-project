exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl
      .string("make", 256)
      .notNullable()
      .index();

    tbl
      .string("model", 256)
      .notNullable()
      .index();

    tbl.string("vin", 128).notNullable();

    tbl.integer("mileage", 128).notNullable();

    tbl.string("transmission", 256).index();

    tbl.string("title", 256).index();
  });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
