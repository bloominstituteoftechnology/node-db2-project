const Cars = require('./cars-model')
const db = require('../../data/db-config')


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})


test('[0] sanity check', () => {
  expect(true).not.toBe(false)
})

describe('Cars Model', () => {

  describe('Get all Cars', () => {
    let cars
    beforeEach(async () => {
      cars = await Cars.getAll()
    })
    test('Returns All Cars', () => {
      expect(cars).toHaveLength(3)
    })
  })


})