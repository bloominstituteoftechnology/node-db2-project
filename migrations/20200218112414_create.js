
exports.up = function(knex, Promise) {
  return knex.schema.createTable('carsManager', tbl => {
      tbl.increments();
      tbl.integer("VIN", 100).notNullable().unique;
      tbl.string('CarMake', 12).index().notNullable();
      tbl.string('CarModel', 15).index().notNullable();
      tbl.integer('CarMiles').notNullable()
      tbl.string('TransType');
      tbl.string('TransStatus');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('carsManager')
};
