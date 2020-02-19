
exports.seed = function(knex) {
  return knex("cars").insert([
    {
      vin:123456789,
      make:"Kia",
      model:"Sportage",
      mileage:12345
    },
    {
      vin:222222,
      make:"McDuff",
      model:"Beer",
      mileage:11111
    }
  ])
};
