
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, make: 'Toyota', model: 'Camry', VIN: '44563645645864365' , mileage: '22000' , Transmission: 'automatic' , title: 'clean'},
        {id: 2, make: 'GMC', model: 'Acadia', VIN: '656366467436464' , mileage: '20000' , Transmission: 'manual' , title: 'clean'},
        {id: 3, make: 'Ford', model: 'F-150', VIN: '9375546543646' , mileage: '90000' , Transmission: 'automatic' , title: 'clean'},
      ]);
    });
};