exports.up = function (knex, Promise) {
    // what happens when we run the migrations
    return knex.schema.createTable('zoos', function(tbl) {
        tbl.increments('id');
        tbl.string('name', 255).notNullable().unique('name', 'uq_zoo_name');
        tbl.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
    // to rollback or undo the changes
    return knex.schema.dropTableIfExists('zoos');
};
