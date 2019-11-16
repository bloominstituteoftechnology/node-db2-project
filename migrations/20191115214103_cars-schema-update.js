exports.up = function(knex) {
   return knex.schema.createTable('cardata', tbl => {
     tbl.increments();
 
     tbl
       .string('vin')
       .notNullable()
       .unique();
 
     tbl.string('make')
     .notNullable();
     tbl.string('model')
     .notNullable();
     tbl.integer('mileage')
     .notNullable();
 
     tbl.string('transmission');
     tbl.string('title');
   });
 };
 
 exports.down = function(knex) {
   return knex.schema.dropTableIfExists('cardata');
 };
 