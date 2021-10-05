exports.up = async function (knex) {
  await knex.schema.table('cars', table => {
    table.increments();
    table.text('vin', 17).unique().notNullable();
    table.text('make', 128).notNullable();
    table.text('modle', 128).notNullable();
    table.integer('mileage').notNullable();
    table.text('title', 128);
    table.text('transmission', 128);
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('cars');
};
