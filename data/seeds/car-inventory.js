
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {id: 1, make: 'bmw', model: '328xi', year: '2007'},
        {id: 2, make: 'bmw', model: '328xi', year: '2007'},
        {id: 3, make: 'bmw', model: '328xi', year: '2007'}
      ]);
    });
};
