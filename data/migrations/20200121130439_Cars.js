
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.string("Vin");
      tbl.string("Make");
      tbl.string("Model");
      tbl.integer("Mileage");
      tbl.boolean("Lemon").defaultTo(false);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
