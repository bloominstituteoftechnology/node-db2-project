
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          vin: '12345678910ghb',
          make: 'chevy',
          model: 'caprice',
          transmission: 'automatic',
          mileage: 123456,
          title: 'clean'
        },

        {
          vin: '12365778910qwe',
          make: 'ford',
          model: 'explore',
          transmission: 'manual',
          mileage: 125677,
          title: 'salvage'
        },

        {
          vin: '65745678910hjk',
          make: 'honda',
          model: 'pilot',
          transmission: 'manual',
          mileage: 34567,
          title: 'clean'
        }
      ]);
    });
};
