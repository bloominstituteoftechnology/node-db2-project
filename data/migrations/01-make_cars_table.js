exports.up = function (knex) {
  return knex.schema.createTable('cars', tbl => {
    tbl.increments() //no 'id' needed because id is default, car_id would be better tho

    tbl.string('vin', 17).notNullable().unique()

    tbl.string('make', 128).notNullable()

    tbl.string('model', 128).notNullable()

    tbl.numeric('mileage').unsigned().notNullable()

    tbl.string('title', 128)//.defaultTo('clean')

    tbl.string('transmission', 128)
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cars') //if we had more than one table we would drop them in the opposite order in which we created them
}