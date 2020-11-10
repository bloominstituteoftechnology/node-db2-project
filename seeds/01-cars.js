
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin:58417489621457416, make:'toyota', model:'camry',
          mileage: 70000, transmissiontype: "automatic", title: 'clean'
       },

      ]);
    });
};