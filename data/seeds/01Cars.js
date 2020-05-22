
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '45478793hh466', model: 'Camery', make: 'Toyota', milege: 2100, transType: 'Automatic', titleStatus: true },
        { VIN: '44668793hh466', model: 'Corolla', make: 'Toyota', milege: 4567, transType: 'Manuale', titleStatus: false }

      ]);
    });
};
