//! Critical Information: -VIN -MAKE -MODEL -MILEAGE !// 
//* Not-nullable fields are listed first *// 
//* Also tracked, but not immediately required: Transmission type, title status *// 
//* Nullable field are listed second *// 

exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments()
      tbl.string('vin', 17).unique().notNullable()
      tbl.string('make', 50).notNullable()
      tbl.string('model', 50).notNullable()
      tbl.integer('mileage').notNullable()
      tbl.string('title', 20)
      tbl.string('transmissionType', 50)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
