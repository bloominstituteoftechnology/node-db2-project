
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        tbl.increments();

        tbl.string("VIN").index();

        tbl.string("Make");

        tbl.string("Model");

        tbl.integer("Mileage");

        tbl.boolean("Automatic Transmission").defaultTo(false);

        tbl.string("Title");
    
        tbl.timestamps(true, true);
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
