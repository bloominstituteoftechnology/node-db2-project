
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').truncate()
    .then(async function () {
      // Inserts seed entries
      await knex('cars').insert([
        {'VIN': '123ABC123', 'make': 'Ford', 'model': 'Mustang', 'milage': 1.0},
        {'VIN': '123DEF123', 'make': 'Ford', 'model': 'Edge', 'milage': 1.0},
        {'VIN': '123GHI123', 'make': 'Ford', 'model': 'Escape', 'milage': 1.0, 'transmission type': 'Auto', 'status of title': 'New'}
      ]);
    });
};
