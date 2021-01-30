
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        { Make: 'Ford', sale_price: 23312 Model: 'Bronco', VIN: 'FB554-875FF452214', Mileage: '65440', titleIsClean: true, }

      ]);
    });
};
