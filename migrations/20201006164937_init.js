exports.up = function (knex) {
    return knex.schema.createTable("cars", (table) => {
      table.string("VIN").primary();
      table.string("Make").index().notNullable();
      table.string("Model").index().notNullable();
      table.integer("Mileage");
      table.string("Transmission Type");
      table.string("Title Status");
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cars");
  };
  