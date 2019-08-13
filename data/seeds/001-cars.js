
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          id: 1, 
          vin: '1FJGWM512MCIWNC83',
          make: "Toyota",
          model: "Camry",
          mileage: 50000,
          transmission_type: "Manual"
        },
        {
          id: 2, 
          vin: 'VUWMBU8491NBITHQ2',
          make: "Toyota",
          model: "Prius",
          mileage: 25000,
          transmission_type: "Automatic"
        },
        {
          id: 3, 
          vin: 'GJ3NV8EJTPALMT73',
          make: "Honda",
          model: "Civic",
          mileage: 100000,
          transmission_type: "Automatic"
        }
      ]);
    });
};
