exports.up = function(knex) {
  return knex.schema
    .createTable("cars", tbl => {
      tbl.increments();
      tbl
        .string("vin", 255)
        .unique()
        .notNullable();
      tbl.string("make", 255).notNullable();
      tbl.string("model", 255).notNullable();
      tbl.integer("year").notNullable();
      tbl.integer("mileage").notNullable();
      tbl.string("transmission_type", 255);
      tbl.string("title_status", 255);
    })

    .createTable("sales", tbl => {
      tbl.increments();
      tbl.string("sold_by", 255).notNullable();
      tbl.integer("final_price").notNullable();
      tbl
        .integer("car_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("cars")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales").dropTableIfExists("cars");
};
