
exports.up = function(knex, Promise) {
    // makes changes to the database
    return knex.schema.createTable('zoo_emails', function(tbl) {
        tbl.increments() // generate an id field auto increments + primary key
        tbl.string('email', 128)

        tbl.integer('zoo_id')
        .unsigned()
        .references('id')
        .inTable('zoos')
    })
  };
  
  exports.down = function(knex, Promise) {
    // undo the changes to the database "ROLLBACK"
    return knex.schema.dropTableIfExists('zoo_emails')
  };
  