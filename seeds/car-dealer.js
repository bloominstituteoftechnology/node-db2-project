
exports.seed = async function(knex) {
  // Deletes ALL existing entries

  // return knex('table_name').del()
  //   .then(function () {
  //     // Inserts seed entries
  //     return knex('table_name').insert([
  //       {id: 1, colName: 'rowValue1'},
  //       {id: 2, colName: 'rowValue2'},
  //       {id: 3, colName: 'rowValue3'}
  //     ]);
  //   });
  await knex('CarDealerShip').truncate()
  await knex('CarDealerShip').insert([
    {CarMake:'toyota',CarModel:'camry',CarYear:1999,CarMileage:100000,Foreign:false,Color:'tan'}
  ])
};
