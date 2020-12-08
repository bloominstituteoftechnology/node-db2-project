
exports.seed = function(knex) {
  // truncate ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        { VIN: '1g1yz23j9d57202418', Make: 'BMW', Milage: '468100' },
        {VIN: '2h3kyz23p2d57272418', Make:'Toyota', Model:'Supra', Milage:'468100', Transmission: 'auto', Title:'clean'}
      ]);
    });
};
