
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        //  VIN, make, model, and mileage.
        // transmission type and status of the title (clean, salvage, etc.),
        
        {
          VIN: 'K0139DKS9382DKSL', MAKE: 'Acura', MODEL: 'MDX',  MILEAGE: '400',
        }

      ]);
    });
};
