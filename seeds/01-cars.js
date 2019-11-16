
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        //  VIN, make, model, and mileage.
        // transmission type and status of the title (clean, salvage, etc.),
        
        {
          vin: 'A123', make: 'Acura', model: 'MDX',  mileage: 123,
        },
        {
          vin: 'B456', make: 'Nissan', model: 'Leaf',  mileage: 456,
        },
        {
          vin: 'C789', make: 'Bugatti ', model: 'Type 18',  mileage: 789,
        }

      ]);
    });
};
