exports.up = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.createTable("cars", tbl => {
    tbl.increments()
    tbl.text("vin", 17).unique().notNullable();
    tbl.text("make", 20).notNullable();
    tbl.text("model", 20).notNullable();
    tbl.text("title").notNullable();
    tbl.text("transmission").notNullable();
    tbl.decimal("mileage").notNullable();
  })
};

exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars")
};
