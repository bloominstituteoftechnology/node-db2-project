const { table } = require("../db-config");

exports.up = function(knex) {
  return knex.schema.createTable('cars',tbl=>{
      tbl.increments('VIN');
      tbl.string('make',128);
      tbl.string('model',128);
      tbl.integer('mileage');
      tbl.text('transmission');
      tbl.string('title_status',128);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars');
};
