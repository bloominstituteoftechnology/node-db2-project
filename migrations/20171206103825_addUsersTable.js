
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tbl) => {
    tbl.increments('id');
    tbl.string('user_name', 80)
      .notNullable()
      .unique('user_name');
    tbl.string('user_password', 80)
      .notNullable();
    tbl.timestamp('createdAt').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
