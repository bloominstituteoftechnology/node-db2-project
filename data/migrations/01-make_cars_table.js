// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema.createTable("cars", table=>{
        table.increments() // this method creates primary key column.  By default it calls it "id".  Can do table.increments("nameGoesHere")
        table.text("name", 128).unique().notNullable() // max 128 characters


    })
};

exports.down = function(knex) {
    // if the cars table exists, delete it
    return knex.schema.dropTableIfExists("cars")
};

// npx knex migrate:up

/*
What would the following do if we are already at the base migration:

mup
- up would create the 1st migration

mlatest
- latest would create both migrations
*/