
exports.up = async (knex) => {
  return await knex.schema.createTable("cars", tbl => {
    tbl.increments("id")
    tbl.integer('VIN').unique().notNullable()
    tbl.text('Make').notNullable()
    tbl.text('Model').notNullable()
    tbl.integer("Mileage").notNullable()
    tbl.text('Tansmission Type')
    tbl.text('Title Status')
  })
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("cars")
};


// required VIN, make, model, milage notNullable
// transmission_type, titleStatud (clean, salvage, unknown, stolen, missing)