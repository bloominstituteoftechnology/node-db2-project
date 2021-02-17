
exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {id: 1, VIN: 'rowValue1', make:'Toyota', model:'Venza', mileage:1000},
        {id: 2, VIN: 'rowValue2', make:'Toyota', model:'Camry', mileage:2000},
        {id: 3, VIN: 'rowValue3', make:'Honda', model:'Civic', mileage:3000}
      ]);
    });
};
