exports.up = function (knex) {
  return knex.schema.createTable("autoDealer", (tbl) => {
    tbl.increments();
    tbl.string("make", 100).notNullable();
    tbl.string("model", 100).notNullable();
    tbl.integer("mileage").notNullable();
    tbl.string("VIN", 50).notNullable().unique();
    tbl.string("transmission", 20);
    tbl.string("title status", 50);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("autoDealer");
};
