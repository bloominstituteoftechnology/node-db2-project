//TODO: KNEX-FLOW: This file was made after using executing 'knex migrate:make cars-table', cars-table the name we give the table, it could be named something else, but make sure the name makes sense // 

//! Critical Information: -VIN -MAKE -MODEL -MILEAGE !// 
//* Not-nullable fields are listed first *// 
//* Also tracked, but not immediately required: Transmission type, title status *// 
//* Nullable field are listed second *// 

//! create a table, here we decide columns each record will have - what common details will each record need? And what will the primary key be?(id) !// 
exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
      tbl.increments()
      tbl.string('vin', 17).unique().notNullable()
      tbl.string('make', 50).notNullable()
      tbl.string('model', 50).notNullable()
      tbl.integer('mileage').notNullable()
      tbl.string('title', 20)
      tbl.string('transmissionType', 50)
  }); 
};

//? Q: If 'knex migrate:latest' is run again - will this function execute and remove the table we previously added? 
exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};

//TODO: KNEX-FLOW: After we have completed the table schema, execute 'knex migrate:latest' VOILA, if successful, you've created a database table // 
//* Recommended: Pull the database file that is created by the above command in SqliteStudio. Use the SQL editor and insert some items into the table - then create a folder for a cars router, so we can test the database with Postman *// 