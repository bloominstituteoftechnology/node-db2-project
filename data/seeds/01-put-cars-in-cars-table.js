exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 1234, make: 'BMW1', model: 'opop', millage: 120, expensive: 'true'  },
        {vin: 12345, make: 'Audi1',model: 'opol',  millage: 110, expensive: 'false'  },
        {vin: 12346, make: 'toyota1', model: 'opo',  millage: 100, expensive: 'false'  },
        {vin: 12347, make: 'Ford1',model: 'op',  millage: 100, expensive: 'false'  }
      ]);
    });
};

