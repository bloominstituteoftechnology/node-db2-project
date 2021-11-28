const cars = [
  {
    vin: 'JTEBU11F670058710',
    make: 'toyota',
    model: 'yaris',
    mileage: 246000,
    title: 'clean',
    transmision: 'manual'
  },
  {
    vin: '1D7HA18287S191814',
    make: 'jeep',
    model: 'grand cherokee',
    mileage: 115000,
    title: 'clean',
  },
  {
    vin: '5UXXW3C58F0M65560',
    make: 'ford',
    model: 'bronco',
    mileage: 250000,
  }
]

exports.seed = async function(knex){
  await knex('cars').truncate()
  await knex('cars').insert(cars)
}