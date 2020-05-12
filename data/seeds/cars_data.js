exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          id: 1,
          vinNumber: '123sdf456sdf456sd',
          make: 'Toyota',
          model: 'Tundra',
          mileage: '33000',
          transmission: 'automatic',
          title: 'clean',
        },
        {
          id: 2,
          vinNumber: '123sdf456sdf456sd',
          make: 'Honda',
          model: 'Accord',
          mileage: '33000',
          transmission: 'manual',
          title: 'clean',
        },
        {
          id: 3,
          vinNumber: '123sdf456sdf456sd',
          make: 'Toyota',
          model: 'Tundra',
          mileage: '33000',
          transmission: 'manual',
          title: 'salvage',
        },
      ]);
    });
};
