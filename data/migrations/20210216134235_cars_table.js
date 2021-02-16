
exports.up = function(knex) {
    return knex.schema.createTable("cars",()=>{
        table.increments();
        table.text("make",128).notNullable();
        table.text("model",128).notNullable();
        table.decimal("VIN").unique().notNullable();
        table.decimal("mileage").notNullable();
        table.text("title-status");
        table.text("transmission-type");
    })
};

exports.down = function(knex) {
  
};
