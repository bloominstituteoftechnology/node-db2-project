exports.up = async function (knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments()
    tbl.text("vin").unique().notNullable()
    tbl.text("make").notNullable()
    tbl.text("model").notNullable()
    tbl.decimal("mileage").notNullable()
    tbl.text("title")
    tbl.text("transmission")
  })
  // DO YOUR MAGIC
};

exports.down = async function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists('cars')
};


