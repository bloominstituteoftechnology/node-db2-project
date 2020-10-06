exports.up = function (knex) {
  return knex.schema.createTable('car_info', (tbl) => {
    tbl.string('VIN').unique().primary();
    tbl.string('Make').notNullable().index();
    tbl.string('Model').notNullable().index();
    tbl.string('Mileage').notNullable().index();
    tbl.string('transmissionType');
    tbl.string('titleStatus');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('car_info');
};
