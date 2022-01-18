const cars = [
  {
    vin: '111111111111111111',
    make: 'chevy',
    model: 'camaro'
  },
  {
    vin: '111111111111111111',
    make: 'ford',
    model: 'mustang'
  },
  {
    vin: '111111111111111111',
    make: 'dodge',
    model: 'charger'
  }
]

exports.seed = async function(knex) {
  await knex('cars').truncate()
  await knex('cars').insert(cars)
}