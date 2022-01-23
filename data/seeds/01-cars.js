const cars = [
  {
    vin: '3GNFK16448G269795',
    make: 'chevy',
    model: 'camaro',
    mileage: 100000
  },
  {
    vin: '1HD1FMW122Y641723',
    make: 'ford',
    model: 'mustang',
    mileage: 150000,
    transmission: 'manual'
  },
  {
    vin: 'JH4KA3261JC334072',
    make: 'handa', 
    model: 'civic',
    mileage: 50000,
    title: 'clean',
    transmission: 'auto'
  }
];

exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(()=> {
      return knex('cars').insert(cars);
    });
};