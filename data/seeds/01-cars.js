
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: 'asdfasdfsad325813',
          make: 'Honda',
          model: 'Civic',
          mileage: 123456789,
          transmissionType: 'Stick',
          title: 'clean'
        },
        {
          VIN: 'asdfgfsdhgfjhkhgk',
          make: 'Nissan',
          model: 'Altima',
          mileage: 500000,
          transmissionType: 'Automatic',
          title: 'clean'
        },
        {
          VIN: 'asdasdtyuitad325813',
          make: 'Toyota',
          model: 'CRV',
          mileage: 155125,
          transmissionType: 'Automatic',
          title: 'clean'
        },
        {
          VIN: 'asdfasvbmbnvmb5813',
          make: 'Subaru',
          model: 'Legacy',
          mileage: 500,
          transmissionType: 'Stick',
          title: 'clean'
        }
      ]);
    });
};
