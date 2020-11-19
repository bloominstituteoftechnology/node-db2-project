exports.up = function (knex) {
  return knex.schema.createTable("car-dealer", (tbl) => {
    tbl.increments("id");
    tbl.string("VIN", 17).unique().notNullable();
    tbl.string("Make", 50).notNullable();
    tbl.string("Model", 50).notNullable();
    tbl.integer("Mileage").notNullable();
    tbl.string("Transmission_type", 30);
    tbl.string("Car_status", 128);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("car-dealer");
};
