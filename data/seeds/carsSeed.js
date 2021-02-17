
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: 654664564566, Make: 'Dodge', Model: 'SRT', miles: 30000,  },
        {id: 2, VIN: 655345564566, Make: 'Dodge', Model: 'Hellcat', miles: 300,  },
      ]);
    });
};
