exports.up = function(knex, Promise) {
  return knex.schema.createTable("bears", tbl => {
    tbl.increments();
    tbl
      .string("name")
      .unique()
      .notNullable();
    tbl
      .integer("zoo_id")
      .notNullable()
      .references("id")
      .inTable("zoos");
  });

  //`id` and `name`, zoo_id
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("bears");
};
