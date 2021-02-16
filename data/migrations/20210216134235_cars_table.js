const { table } = require("../dbConfig");

exports.up = function(knex) {
    return knex.schema.createTable("cars",table=>{
        table.increments();
        table.text("make",128).notNullable();
        table.text("model",128).notNullable();
        table.decimal("VIN").unique().notNullable();
        table.decimal("mileage").notNullable();
        table.text("title_status");
        table.text("transmission_type");
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
