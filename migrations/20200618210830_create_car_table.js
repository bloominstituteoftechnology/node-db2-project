
exports.up = async (knex) => {
  return await knex.schema.createTable("cars", tbl => {
    tbl.increments("id")
    tbl.integer('vin').unique().notNullable()
    tbl.text('make').notNullable()
    tbl.text('model').notNullable()
    tbl.integer("mileage").notNullable()
    tbl.text('transmission_type')
    tbl.text('title_status')
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("cars")
};


// required VIN, make, model, milage notNullable
// transmission_type, titleStatud (clean, salvage, unknown, stolen, missing)