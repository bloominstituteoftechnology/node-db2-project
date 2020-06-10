
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert(generateCars());
    });
};

const generateCars = () => {
  return [
    {
      VIN: '83HS90',
      make: 'Toyota',
      model: 'Camry',
      mileage: 60000
    },
    {
      VIN: '56ST8F',
      make: 'Tesla',
      model: 'Model S',
      mileage: 35000
    },
    {
      VIN: '12SH5J',
      make: 'BMW',
      model: 'M3',
      mileage: 40000
    },
  ]
};