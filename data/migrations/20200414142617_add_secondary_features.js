exports.up = function (knex) {
  return knex.schema.table("car-dealer", (tbl) => {
    // Transmission type
    tbl.string("Transmission");
    // Title status
    tbl.string("Title Status");
  });
};

exports.down = function (knex) {
  return knex.schema.table("car-dealer", (tbl) => {
    tbl.dropColumn("Transmission");
    tbl.dropColumn("Title Status");
  });
};
