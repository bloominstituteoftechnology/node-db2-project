
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, car: 'Koenigsess'},
        {id: 2, colName: 'Audi'},
        {id: 3, colName: 'Toyota'}
      ]);
    });
};
