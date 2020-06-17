exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments("id");
    tbl.string("vin").notNullable();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("transmission");
    tbl.string("status");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
