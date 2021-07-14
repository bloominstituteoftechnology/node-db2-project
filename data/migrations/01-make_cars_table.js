
// lets buid the up migration
// are creatting a blueprint of the database that is ging to build


exports.up = function (knex) {
  // DO YOUR MAGIC

  return knex.schema.createTable("cars" ,(table) => {
table.increments("id")
table.text("vin")
.unique()
.notNullable()
  
table.text("make")
.notNullable()

table.text("model")
.notNullable()

table.text("title")
.notNullable()

table.integer("mileage")
.notNullable()

table.text("transmission")
.notNullable();
  
  })
};


// this deletes our table
exports.down = function (knex) {
  // DO YOUR MAGIC
  return knex.schema.dropTableIfExists("cars");
};
