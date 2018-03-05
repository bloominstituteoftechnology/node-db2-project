/*eslint-disable*/

exports.up = function (knex, Promise) {
  // for making changes to the database
  return knex.schema.createTable('zoos', (tbl) => {
    tbl.increments();
    

    tbl
      .string('name', 255)
      .notNullable()
      .unique('name');

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

exports.down = function (knex, Promise) {
  // for undoing changes
  return knex.schema.dropTableIfExists('zoos');
};

