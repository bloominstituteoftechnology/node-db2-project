// look at schema building

exports.up = function(knex) { //builds up the table in the database for us
  return knex.schema.createTable("cars", table => {
      table.increments()
       table.text("VIN",128).unique().notNullable()
       table.string("model", 128)
       table.string("make", 128)
       table.integer("mileage")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars") // drop means delete in SQL
};
