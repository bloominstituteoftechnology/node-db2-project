const { default: knex } = require("knex")

const cars = [
  {
    vin: '1111111111111111',
    make: 'toyota',
    model: 'yaris',
    mileage: 246000,
    title: 'clean',
    transmision: 'manual'
  },
  {
    vin: '2222222222222222',
    make: 'jeep',
    model: 'grand cherokee',
    mileage: 115000,
    title: 'clean',
  },
  {
    vin: '3333333333333333',
    make: 'ford',
    model: 'bronco',
    mileage: 250000,
  }
]

exports.seed = async function(knex){
  await knex('cars').truncate()
  await knex('cars').insert(cars)
}