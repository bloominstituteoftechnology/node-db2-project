
exports.up = function (knex) {

  return knex.schema.createTable("cars", tbl => {
    tbl.increments("id")

    tbl
      .string("VIN", 255)
      .notNullable()
      .unique()
      .index()

    tbl
      .integer("make")
      .notNullable()
      .index()

    tbl
      .string("model", 255)
      .notNullable()
      .index()

    tbl
      .integer("mileage")
      .notNullable()
      .index()

    tbl
      .string("transmissionType", 255)
      .index()

    tbl
      .string("state", 255)
      .index()

  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars")
};
