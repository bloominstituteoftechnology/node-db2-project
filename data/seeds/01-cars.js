
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Car Table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Car Table').insert([
        {vin: 'zbgh-123',Make: 'Rolls Royce',Model: 'Phantom',Mileage: '10000',TransmissionType: 'manual',TitleStatus: 'clean'},
        {vin: 'dsfr-123',Make: 'Honda',Model: 'Civic',Mileage: '10000000',TransmissionType: 'auto',TitleStatus: 'clean'},
        {vin: 'kjdsj-123',Make: 'Nissan',Model: 'Phantom',Mileage: '50',TransmissionType: 'auto',TitleStatus: 'salvaged'}
      ]);
    });
};

//need to enter data here