
exports.up = function(knex) {
  return knex.schema.createTable('cars', tbl => {
        tbl.text('vin',128)
            .unique()
            .notNullable();
        tbl.text('make',128);
        tbl.text('model',128);
        tbl.text('mileage',128);
  })
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists('cars')
};
