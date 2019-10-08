
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {id: 1, VIN: '123', make: 'Dodge', model: 'Stratus', mileage: 160000, transmission_type: 'Automatic', title_status: 'Owned'},
        {id: 2, VIN: '456', make: 'Chevy', model: 'Diablo', mileage: 78000, transmission_type: 'Manual', title_status: 'Loan active'},
        {id: 3, VIN: '789', make: 'Ford', model: 'F-150', mileage: 12000, transmission_type: 'Flying Truck', title_status: 'At Titlemax'}
      ]);
    });
};
