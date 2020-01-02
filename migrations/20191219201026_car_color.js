
exports.up = async function(knex) {
  await knex.schema.createTable("car color", (table) => {
      table.increments("id")
      table.text("color")
  })
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("car color")
};
