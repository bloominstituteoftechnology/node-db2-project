
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {"VIN":"WXY23958","mileage":5490232,"make":"Smart","model":"Fortwo","year":2009},
        {"VIN":"WXY25398","mileage":5493032,"make":"Audi","model":"4000CS Quattro","year":1987},
        {"VIN":"WXY239y8","mileage":5495032,"make":"Ford","model":"Windstar","year":1996},
        {"VIN":"WXY2y398","mileage":5749032,"make":"Mercedes-Benz","model":"E-Class","year":2000},
        {"VIN":"WXY239888","mileage":8549032,"make":"Infiniti","model":"G35","year":2004},
        {"VIN":"WXY23918","mileage":149032,"make":"Lotus","model":"Esprit","year":2004},
        {"VIN":"1WXY2398","mileage":5249032,"make":"Chevrolet","model":"Cavalier","year":1997},
      ]);
    });
};
