
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        //  VIN, make, model, and mileage.
        // transmission type and status of the title (clean, salvage, etc.),
        
        {
          VIN: 'K0139DKS9382DKSL',
          Make: 'Acura',
          Model: 'MDX',
          Mileage: '400',
        },
        {
          VIN: 'T29039VSJDK3932L',
          Make: 'Ford',
          Model: 'Edge',
          Mileage: '10',
        },
        {
          VIN: 'KDLS909202FDLSL2',
          Make: 'Ford',
          Model: 'Transit',
          Mileage: '200',
        }


      ]);
    });
};
