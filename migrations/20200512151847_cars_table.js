
exports.up = function(knex) {
  return knex.schema.table('cars', tbl =>{
      tbl.increments();

      tbl.text('VIN', 17 ).notNullable().unique()
      tbl.string('make').notNullable()
      tbl.string('model').notNullable()
      tbl.bigInt('milage').notNullable()

      tbl.string('transmission')
      tbl.string('title')
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars')
};
