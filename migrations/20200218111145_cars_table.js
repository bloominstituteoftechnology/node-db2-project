
exports.up = function(knex) {
  return knex.schem.createTable("cars", tbl => {
      
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars")
};
