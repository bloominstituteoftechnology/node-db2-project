
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bears', function(tbl) {
        tbl.increments('id');
        tbl
            .integer('zooId') // will reference the field id in the primary key of the table which is references('id') in inTable('zoos')
            .notNullable()
            .references('id') // foreign key
            .inTable('zoos');
        tbl.string('species', 80).notNullable().unique('species', 'uq_bear_species');
        tbl.string('latinName', 80).notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('bears');
};
