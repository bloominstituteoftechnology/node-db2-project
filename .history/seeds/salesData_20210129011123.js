
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        { order_id: shortid.generate() , Make: 'Ford', sale_price: 23312, Model: 'Bronco', VIN: 'FB554-875FF452214', Mileage: '65440', titleIsClean: true, }

      ]);
    });
};
