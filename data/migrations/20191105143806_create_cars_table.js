
exports.up = function(knex) {
  return knex.schema
  .createTable('cars', table => {
    // id (integer) primary key
    table.increments('id')
    // VIN (string) unique required
    table.string('vin').unique().notNullable()
    // make (string) required
    table.string('make').notNullable()
    // model (string) required
    table.string('model').notNullable()
    // mileage (float) required
    table.float('mileage').notNullable()
    // transmission type (string)
    table.string('transmission_type')
    // title status (string)
    table.string('title_status')
    // timestamps
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTable('cars')
};
