const cars = [
  {
    vin: '1PNFK16448G269795',
    make: 'chevy',
    model: 'camaro',
    mileage: 10000
  },
  {
    vin: '1HD1FMW122Y641723',
    make: 'ford',
    model: 'mustang',
    mileage: 15000,
    transmission: 'manual'
  },
  {
    vin: 'HJ4KA3261JC334072',
    make: 'honda', 
    model: 'civic',
    mileage: 5000,
    title: 'clean',
    transmission: 'automatic'
  }
];

exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(()=> {
      return knex('cars').insert(cars);
    });
};