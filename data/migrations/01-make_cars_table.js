exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments()
    tbl.string('vin', 17).notNullable().unique()
    tbl.string('make', 128).notNullable()
    tbl.string('model', 128).notNullable()
    tbl.integer('mileage').unsigned().notNullable()
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableifExists('cars')
};
