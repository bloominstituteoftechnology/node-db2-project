
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Cars Table').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Cars Table').insert([
        {vin: 'v2324f2',Make: 'tesla',Model: 'model S',Mileage: '5000',TransmissionType: 'none',TitleStatus: 'clean'},
        {vin: 'v423422',Make: 'Mazda',Model: 'CX-5',Mileage: '700000',TransmissionType: 'auto',TitleStatus: 'clean'},
        {vin: 'v894a98',Make: 'Ford',Model: 'mustang' ,Mileage: '90000',TransmissionType: 'manual',TitleStatus: 'salvaged'}
      ]);
    });
};
