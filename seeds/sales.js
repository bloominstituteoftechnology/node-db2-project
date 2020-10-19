
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('sales').del()
    .then(function () {
      // Inserts seed entries
      return knex('sales').insert([
        {vin: "ve7676", price: 15000, buyersName: "Paul Menard" },
        {vin: "vhuy74647", price: 10230, buyersName: "Tom Brady"},
        {vin: "v76yhdteg", price: 9500, buyersName: "Mike Lopes"}
      ]);
    });
};