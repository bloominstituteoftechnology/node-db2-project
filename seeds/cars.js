
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').del()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {vin: "ve7676", make: 'Ford', model: "f-150", mileage: 150000, transType: "auto", titleStatus: "clean", sold: false, img: "" },
        {vin: "vhuy74647", make: 'Chevey', model: "s-10", mileage: 34000, transType: "stand", titleStatus: "one acc", sold: false, img: ""  },
        {vin: "v76yhdteg", make: 'Chrystler', model: "Grand Jeroeke", mileage: 15000, transType: "auto", titleStatus: "clean", sold: false, img: ""  }
      ]);
    });
};
