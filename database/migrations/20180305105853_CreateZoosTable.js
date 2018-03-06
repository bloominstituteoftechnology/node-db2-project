exports.up = function(knex, Promise) {
  return knex.schema.createTable('zoos', tbl => {
    tbl.increments(); // add primary key called id and increments

    tbl
      .string('name', 255)
      .notNullable() // required value
      .unique('name'); // unique value

    tbl.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('zoos');
  // return knex.schema.dropTableIfExists('zoos'); // deprecated
};
