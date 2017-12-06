
exports.up = function(knex, Promise) {
    //what happens when we run the migration
    return knex.schema.createTabele('zoos', function(tbl) {
        tbl.increments('id');
        tble.string('name', 255).notNullable().unique('uq_zoo_name');
        tble.timestamps('create_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    // to roll back or undo the changes
};
