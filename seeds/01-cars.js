
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, make: 'Toyota', model: 'Corolla', VIN: '33563645645364365' , mileage: '1233456' , transmition: 'automatic' , title: 'clean'},
        {id: 2, make: 'GMC', model: 'Acadia', VIN: '356366467436464' , mileage: '657578658' , transmition: 'manual' , title: 'clean'},
        {id: 3, make: 'Ford', model: 'F-150', VIN: '5345336543646' , mileage: '8776896' , transmition: 'automatic' , title: 'clean'},
      ]);
    });
};
