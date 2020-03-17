exports.up = function(knex) {
    return knex.schema.createTable("automobiles", tbl => {
      tbl.increments();
      tbl.string("VIN", 128).notNullable();
      tbl
        .string("make", 256)
        .notNullable()
        .index();
      tbl.string("model", 128).notNullable();
      tbl.string("mileage", 128).notNullable();
      tbl.boolean("automatic");
      tbl.boolean("cleanTitle");
    });
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists("automobiles");
  };