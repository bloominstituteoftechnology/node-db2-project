// DO YOUR MAGIC
exports.up = async function(knex) {
      await knex.schema.createTable("cars", (table) => {
            table.increments("id")
            table.text("vin")
            table.text("make")
            table.text("model")
            table.text("title")
            table.text("transmission")
            table.integer("mileage")
      })
}

exports.down = async function(knex) {
      await knex.schema.dropTableIfExists("cars")
}