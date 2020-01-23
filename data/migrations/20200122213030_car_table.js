exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();

    tbl.string("VIN", 200).unique().notNullable();

    tbl.string("make", 200).notNullable();

    tbl.string("model", 200).notNullable();

    tbl.string("mileage", 200).notNullable();

    tbl.string("transmission", 200);
    tbl.string("title_status", 200);

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};