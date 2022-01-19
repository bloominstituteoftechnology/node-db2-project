const cars = [
  {
    vin: '111111111111111111',
    make: 'chevy',
    model: 'camaro',
    mileage: 50000
  },
  {
    vin: '211111111111111111',
    make: 'ford',
    model: 'mustang',
    mileage: 40000
  },
  {
    vin: '311111111111111111',
    make: 'dodge',
    model: 'charger',
    mileage: 30000
  }
]

// exports.seed = async function(knex) {
//   await knex('cars').truncate()
//   await knex('cars').insert(cars)
// }

exports.seed = function(knex) {
  return knex('cars')
  .truncate().then(() => {
    return knex('cars').insert(cars)
  })
}