//implement my changes
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments("id");
    tbl
      .decimal("VIN")
      .notNullable()
      .unique();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("type");
    tbl.boolean("clean");
    tbl.boolean("salvage");
  });
};

// rollback my changes
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
