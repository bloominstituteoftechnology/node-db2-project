
exports.up = async function(knex) {
    await knex.schema.createTable("fruits", (table) => {
        // table.interger("id").notNull().unique().primary()
        table.increments("id")
        table.text("name").notNull().unique()
        table.text("color")
  })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("cars")
};
