exports.up = function (knex) {
  return knex.schema.table('cars', table => {
    table.string('title', 128)
      .unique()
      .nullable()
    table.string('transmission', 128)
      .nullable()
  })
}

exports.down = function (knex) {
  return knex.schema.table('cars', table => {
    table.dropColumn('title')
    table.dropColumn('transmission')
  })
}
