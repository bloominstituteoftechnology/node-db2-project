exports.up = function(knex, Promise) {
  return knex.schema.createTable("zoos", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .unique()
      .notNullable();

    tbl.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("zoos");
};
