
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      const cars = [
        {
          VIN: 12345,
          make: 'Honda',
          model: 'Civic',
          carmiles: 99999,
          transtype: 'Continuously Variable',
          titlestatus: 'Clean'
        },
        {
          VIN: 23456,
          make: 'Jaguar',
          model: 'XF',
          carmiles: 15800,
          transtype: 'Semi Automatic',
          titlestatus: 'Lien'
        },
        {
          VIN: 34567,
          make: 'Porsche',
          model: 'Panamera',
          carmiles: 47235,
          transtype: 'Automatic',
          titlestatus: 'Salvage'
        }
      ];

      return knex('cars').insert(cars)
      // return knex('cars').insert([
      //   {id: 1, colName: 'rowValue1'},
      //   {id: 2, colName: 'rowValue2'},
      //   {id: 3, colName: 'rowValue3'}
      // ]);
    });
};
