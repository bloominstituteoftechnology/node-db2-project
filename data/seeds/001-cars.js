
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { 
          Vin: '0009093049302943',
          make: 'Toyota',
          model: 'Prius',
          mileage: 24324
        },
        { 
          Vin: '464681651316884879',
          make: 'Honda',
          model: 'Civic',
          mileage: 815
        },
        { 
          Vin: '41616513513216351',
          make: 'Jeep',
          model: 'Cherokee',
          mileage: 9000
        }
      ]);
    });
};
