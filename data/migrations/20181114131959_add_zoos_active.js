
exports.up = function(knex, Promise) {
  return knex.schema.table('zoos', function(tbl) {
      tbl.boolean('is_active')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('zoos', function(tbl) {
      tbl.dropColumn('is_active')
  })
};
