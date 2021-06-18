
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: '1FAFP40492F210196', make: 'Audi', model: 'A7', mileage: 1600, title: 'Bob Fleming', transmission: ''},
        {vin: '5TFEM5F14EX076293', make: 'Mercedes', model: 'S Class', mileage: 0, title: 'David King', transmission: ''},
        {vin: 'JKBVNAE18YA097782', make: 'BMW', model: '328i', mileage: 0, title: 'Michael Brown', transmission: ''}
      ]);
    });
};
