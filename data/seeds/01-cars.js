
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          "VIN": 1226589,
          "make": "Mercedes",
          "model": "S320",
          "mileage": 0,
          "transmissionType": "manual",
          "titleStatus": "clean"
        },
        {
          "VIN": 6587492,
          "make": "BMW",
          "model": "X6",
          "mileage": 2500,
          "transmissionType": "automatic",
          "titleStatus": "clean"
        },
        {
          "VIN": 23651213,
          "make": "Honda",
          "model": "Accord",
          "mileage": 3500,
          "transmissionType": null,
          "titleStatus": null
        }
      ]);
    });
};