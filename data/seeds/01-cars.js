exports.seed = function (knex) {
  return knex('cars')
    .truncate()
    .then(() => {
      return knex('cars')
        .insert([
          {
            vin: 'JTDBE30K620061417',
            make: 'toyota',
            model: 'camry',
            mileage: 123400,
            title: '2002 Toyota Camry',
            transmission: 'automatic',
          }, {
            vin: '2C4GP44362R700796',
            make: 'chrysler',
            model: 'town and country',
            mileage: 300000,
            title: '2002 Chrysler Town and Country',
            transmission: 'automatic',
          }, {
            vin: 'ZC2FP1107KB204113',
            make: 'chrysler',
            model: 'tc',
            mileage: 242000,
            title: '1989 Chrysler TC',
            transmission: 'manual',
          }, {
            vin: 'JH4DC4433RS801008',
            make: 'acura',
            model: 'integra',
            mileage: 222222,
            title: '1994 Acura Integra',
            transmission: 'manual',
          },
        ])
    })
}