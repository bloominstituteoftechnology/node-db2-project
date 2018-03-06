exports.up = function(knex, Promise) {
  // making changes to db
  return knex.schema.createTable("zoos", tbl => {
    tbl.increments(); // creates a primary key called id

    tbl
      .string("name", 255)
      .notNullable() // required
      .unique("name"); // value is unique

    tbl.timestamp("created_at").default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  // undoing changes to db
  return knex.schema.dropTableIfExists("zoos");
};
