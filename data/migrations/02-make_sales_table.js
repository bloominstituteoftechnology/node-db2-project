exports.up = function(knex) {
    return knex.schema.createTable("sales",table=>{
        table.increments();
        table.text("vin")
        table.foreign("vin").references("cars.vin")
        table.decimal("price").notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("sales");
};