
exports.seed = function(knex,promise) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 1, make: 'Ford',model:'F-150',mileage:30},
        {VIN: 2, make: 'Dodge',model:'Ram',mileage:25},
        {VIN: 3, make: 'Toyota',model:'Tundra',mileage:22}
      ]);
    });
};
