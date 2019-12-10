exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: 'WBAAV33421FU91768', make: 'Tesla', model: 'S', mileage:'6', transmission: '9.73:1 step-down', title: 'clean'},
        {vin: '1LNHM81V87Y600143', make: 'Ford', model: 'Mustang', mileage:'13', transmission: '6-speed manual', title: 'clean'},
        {vin: 'JH4DB2380NS000339', make: 'Chevy', model: 'Camaro', mileage:'30'}
      ]);
    });
};
