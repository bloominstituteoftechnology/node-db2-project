
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('zoos').del()
    .then(function () {
      // Inserts seed entries
      return knex('zoos').insert([
        {name: 'Alaska Zoo'},  // 1, 2, 3 accordingly on the id's
        {name: 'Bronx Zoo'},
        {name: 'San Diego Zoo'}
      ]);
    });
};
