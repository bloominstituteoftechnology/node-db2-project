
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          make: 'Nissan' ,
          model: 'Murano', 
          mileage: '7000', 
          vin: '3PCAJ5M39KF123157'
        },

        {
          make: 'Chevrolet' ,
          model: 'Trax', 
          mileage: '2000', 
          vin: '3PCAJ5M39KF123143'
        },

        {
          make: 'Toyota' ,
          model: 'corolla', 
          mileage: '3200', 
          vin: '3PCAJ5M39KF123156'
        },
      ]);
    });
};
