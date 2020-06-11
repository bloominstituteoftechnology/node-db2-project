
exports.up = function(knex) {
    return knex.schema.createTable("cars", tbl => {
        tbl.increments();

        tbl.string("VIN").notNullable().unique();
        tbl.string("make", 255).notNullable();
        tbl.string("model", 255).notNullable();
        tbl.integer("mileage").notNullable();
        tbl.string("transmission", 20).nullable();
        tbl.string("title", 20).nullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExist('cars')
};
