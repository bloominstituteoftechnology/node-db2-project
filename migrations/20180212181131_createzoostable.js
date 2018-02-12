
exports.up = function(knex, Promise) {
    return knex.schema.createTable('Zoos', tbl => {
        tbl.increments(id);
        tbl.string('name', 200)
            .notNullable()
            .unique('name', 'uq_zoo_name');
        tbl.timestamp('createdOn').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('Zoos');
  
};
