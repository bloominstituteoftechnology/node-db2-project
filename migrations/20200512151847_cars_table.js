
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl =>{
      tbl.increments();

      tbl.string('VIN', 17 ).notNullable().unique()
      tbl.string('make').notNullable()
      tbl.string('model').notNullable()
      tbl.bigInteger('milage').notNullable()

      tbl.string('transmission')
      tbl.string('title')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
