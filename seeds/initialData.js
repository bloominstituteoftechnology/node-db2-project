
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('car-dealer').del()
    .then(function () {
      // Inserts seed entries
      return knex('car-dealer').insert([
        { Make: 'Honda', Model: 'Accord Sport', VIN: '28473H27346128FFX', Mileage: '12879', titleIsClean: true, },
        { Make: 'Lexus', Model: 'IS350', VIN: 'U8920K128321928J3', Mileage: '2354', titleIsClean: true, },
        { Make: 'Hyundai', Model: 'Sonata', VIN: 'P123445H4314JDKA', Mileage: '5634', titleIsClean: true, },
        { Make: 'Acura', Model: 'TLX', VIN: 'A123948DJSL3245314A', Mileage: '4489', titleIsClean: true, },
        { Make: 'Toyota', Model: 'Corolla S', VIN: 'T21749SK3UC344EU3', Mileage: '10098', titleIsClean: false, },
        { Make: 'Ford', Model: 'Mustang GT', VIN: 'FM3020JJSP2020LAJD', Mileage: '13004', titleIsClean: false, },
        { Make: 'Tesla', Model: 'Model T', VIN: 'TTA93KSJALL2123123W', Mileage: '4508', titleIsClean: true, },
        { Make: 'Audi', Model: 'A6', VIN: 'A6IEJWN09381034710', Mileage: '3504', titleIsClean: true, },
        { Make: 'BMW', Model: 'M8', VIN: 'BMW8475020437513GDFE', Mileage: '6540', titleIsClean: true, },


      ]);
    });
};
