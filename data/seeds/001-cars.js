exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('cars').insert([
        {
          make: 'Honda',
          model: 'Accord',
          mileage: '129987',
          VIN: '1GH6754TYV8765498',
          transmission: 'AT',
          title: ''
        },
        {
          make: 'Toyota',
          model: 'Prius',
          mileage: '22876',
          VIN: '2YT87654TYHG87654',
          transmission: 'CVT',
          title: 'Clean'
        },
        {
          make: 'Ford',
          model: 'Escape',
          mileage: '31567',
          VIN: '1JU87654TJOP97654',
          transmission: 'AT',
          title: 'Salvage'
        },
        {
          make: 'Mazda',
          model: 'Miata',
          mileage: '65490',
          VIN: '3UJ87654TJOP99832',
          transmission: 'MT',
          title: 'Flood'
        },
        {
          make: 'Acura',
          model: 'RSX',
          mileage: '65312',
          VIN: '1YT87654TYKL92654',
          transmission: 'MT',
          title: 'Rebuild'
        },
        {
          make: 'Chevrolet',
          model: 'Cruze',
          mileage: '55378',
          VIN: '3PK87654TJOP99487',
          transmission: 'AT',
          title: ''
        }
      ]);
    });
};
