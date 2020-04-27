exports.up = async function (knex) {
  await knex.schema.alterTable("cars", (table) => {
    table.float("Price");
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("cars", (table) => {
    table.dropColumn("Price");
  });
};
