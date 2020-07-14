exports.up = function (knex) {
    return knex.schema.createTable("cars", (tbl) => {
        tbl.increments();
        tbl.string("VIN").notNullable();
        tbl.string("Make").notNullable();
        tbl.string("Modal").notNullable();
        tbl.integer("Milage").notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("cars");
};
