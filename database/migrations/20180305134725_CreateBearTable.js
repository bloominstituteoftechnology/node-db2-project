exports.up = function(knex, Promise) {
  return knex.schema.createTable("bears", tbl => {
    tbl.increments("id").primary();

    tbl
      .integer("zooId")
      .unsigned()
      .references("id") // foreign key
      .inTable("zoos");

    tbl
      .string("species", 80)
      .unique("species")
      .notNullable();

    tbl.string("latinName", 80).notNullable();

    tbl.timestamp("createdAt").default(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("bears");
};
