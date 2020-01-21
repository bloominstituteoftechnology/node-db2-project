
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { make: 'BMW1', avgSpeed: 120, expensive: 'true'  },
        { make: 'Audi1', avgSpeed: 110, expensive: 'false'  },
        { make: 'toyota1', avgSpeed: 100, expensive: 'false'  },
        { make: 'Ford1', avgSpeed: 100, expensive: 'false'  }
      ]);
    });
};
