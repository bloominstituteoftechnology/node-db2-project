exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.increments()
    table.string('vin', 17)
      .unique()
      .notNullable()
    table.string('make', 128)
      .notNullable()
    table.string('model', 128)
      .notNullable()
    table.decimal('mileage')
      .notNullable()
    table.timestamps(true, true)
  })
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars')
}