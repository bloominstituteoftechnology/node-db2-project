
exports.up = function(knex) {
  return knex.schem.createTable("cars", tbl => {
        tbl.increment();

        tbl.integer("VIN Number")
            .notNullable()
            .index();

        tbl.string("Make", 128)
            .notNullable();
        
        tbl.string("Model", 128)
            .notNullable();
        
        tbl.integer("Mileage")
            .notNullable();
        
        tbl.string("Transmission Type", 128)

        tbl.string("Title Status", 128)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
