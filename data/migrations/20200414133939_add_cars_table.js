exports.up = function (knex) {
  return knex.schema.createTable("car-dealer", (tbl) => {
    tbl.increments("id");
    // VIN
    tbl.string("VIN", 17).notNullable().unique().index();
    // Make
    tbl.string("Make").notNullable();
    // Model
    tbl.string("Model").notNullable();
    // Mileage
    tbl.float("Mileage").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableifExists("car-dealer");
};
