exports.up = function(knex) {
  return knex.schema.createTable("sales", tbl => {
    tbl.increments();
    tbl
      .integer("car_id")
      .notNullable()
      .references("id")
      .inTable("cars")
      .index();

    tbl.boolean("sold", false).notNullable();

    tbl.string("seller", 20);
    tbl.string("buyer", 20);

    tbl.integer("sold_for");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("sales");
};
