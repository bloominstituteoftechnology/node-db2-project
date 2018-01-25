
exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', function(tbl) {
      tbl.increments('id');
      tbl.string('name', 255).notNullable().unique('name', 'uq_zoos_name');
      tbl.timestamp('created_at').defaultTo(knex.fn.now()); 
  })
};

exports.down = function(knex, Promise) {

    return knex.schema.dropTableIfExists('zoos');
  
};
