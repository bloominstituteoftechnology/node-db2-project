exports.up = async function (knex) {
  await knex.schema.createTable('cars', (table) => {
    table.increments('Vin');
    table.text('make').notNull().unique();
    table.float('model').notNull();
    table.boolean('mileage').defaultTo(true);
  });

  exports.down = async function (knex) {
    return knex.schema.dropTableIfExist('cars');
  };
};
