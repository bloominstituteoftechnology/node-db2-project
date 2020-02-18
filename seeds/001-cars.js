exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("cars")
    .truncate()
    .then(function() {

      const cars = [
        {
          make: 'Chevrolet',
          model: 'Impala',
          vin: '1NXBU4EE7AZ320429',
          mileage: 65000,
          transmission: 'automatic',
          title: 'clean'
        },
        {
          make: 'Ford',
          model: 'Falcon',
          vin: '2GKALUEK2C6124428',
          mileage: 120000,
          transmission: 'manual'
        },
        {
          make: 'Dodge',
          model: 'Challenger',
          vin: '1B3ES56C55D168877',
          mileage: 85000,
          title: 'salvage'
        }
      ]
      // Inserts seed entries
      return knex("cars").insert(cars);
    });
};
