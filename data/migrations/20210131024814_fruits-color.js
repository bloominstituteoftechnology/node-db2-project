
exports.up = function(knex) {
  return knex.schema.table('fruits',tbl =>{
      tbl.string('color', 25);
  })

};

exports.down = function(knex) {
    return knex.schema.table('fruits', tb =>{
        tb.dropColumn('color');
    })
};
