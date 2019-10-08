
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
      tbl.increments();
      tbl.integer('VIN').notNullable().unique();
      tbl.string('Make', 128).notNullable();
      tbl.string('Model', 128).notNullable();
      tbl.integer('Milage').notNullable(); 
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars')
};
