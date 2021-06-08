const request = require('supertest')
const server = require('./api/server')
const db = require('./data/db-config')
const cars = [
  {
    vin: '11111111111111111',
    make: 'toyota',
    model: 'prius',
    mileage: 250000,
    title: 'salvage',
    transmission: 'CVT',
  },
  {
    vin: '22222222222222222',
    make: 'ford',
    model: 'mustang',
    mileage: 120000,
    title: 'clean',
    transmission: 'manual',
  },
  {
    vin: '33333333333333333',
    make: 'honda',
    model: 'accord',
    mileage: 220000,
    title: 'clean',
    transmission: 'automatic',
  },
]

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

test('[0] sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  describe('[GET] /api/cars', () => {
    beforeEach(async () => {
      await db('cars').truncate()
      await db('cars').insert(cars)
    })
    test('[1] gets the correct number of cars', async () => {
      const res = await request(server).get('/api/cars')
      expect(res.body).toHaveLength(cars.length)
    }, 500)
    test('[2] gets the correct cars', async () => {
      const res = await request(server).get('/api/cars')
      expect(res.body).toMatchObject(cars)
    }, 500)
  })
  describe('[GET] /api/cars/:id', () => {
    beforeEach(async () => {
      await db('cars').truncate()
      await db('cars').insert(cars)
    })
    test('[3] gets the correct car', async () => {
      let res = await request(server).get('/api/cars/1')
      expect(res.body).toMatchObject(cars[0])
      res = await request(server).get('/api/cars/2')
      expect(res.body).toMatchObject(cars[1])
      res = await request(server).get('/api/cars/3')
      expect(res.body).toMatchObject(cars[2])
    }, 500)
    test('[4] responds with 404 on id not found', async () => {
      let res = await request(server).get('/api/cars/111')
      expect(res.status).toBe(404)
    }, 500)
  })
  describe('[POST] /api/cars', () => {
    beforeEach(async () => {
      await db('cars').truncate()
    })
    test('[5] creates a car in the database', async () => {
      await request(server).post('/api/cars').send(cars[0])
      await request(server).post('/api/cars').send(cars[1])
      await request(server).post('/api/cars').send(cars[2])
      const carsDb = await db('cars')
      expect(carsDb[0]).toMatchObject(cars[0])
      expect(carsDb[1]).toMatchObject(cars[1])
      expect(carsDb[2]).toMatchObject(cars[2])
    }, 500)
    test('[6] responds with the newly created car', async () => {
      const res1 = await request(server).post('/api/cars').send(cars[0])
      const res2 = await request(server).post('/api/cars').send(cars[1])
      const res3 = await request(server).post('/api/cars').send(cars[2])
      expect(res1.body).toMatchObject({ id: 1, ...cars[0] })
      expect(res2.body).toMatchObject({ id: 2, ...cars[1] })
      expect(res3.body).toMatchObject({ id: 3, ...cars[2] })
    }, 500)
    test('[7] responds with a 400 and proper error on missing vin', async () => {
      const { vin, ...badCar } = cars[0] // eslint-disable-line
      const res = await request(server).post('/api/cars').send(badCar)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message', 'vin is missing')
    }, 500)
    test('[8] responds with a 400 and proper error on missing make', async () => {
      const { make, ...badCar } = cars[0] // eslint-disable-line
      const res = await request(server).post('/api/cars').send(badCar)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message', 'make is missing')
    }, 500)
    test('[9] responds with a 400 and proper error on missing model', async () => {
      const { model, ...badCar } = cars[0] // eslint-disable-line
      const res = await request(server).post('/api/cars').send(badCar)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message', 'model is missing')
    }, 500)
    test('[10] responds with a 400 and proper error on missing mileage', async () => {
      const { mileage, ...badCar } = cars[0] // eslint-disable-line
      const res = await request(server).post('/api/cars').send(badCar)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message', 'mileage is missing')
    }, 500)
    test('[11] responds with a 400 and proper error on invalid vin', async () => {
      const badCar = { ...cars[0], vin: 'abc' }
      const res = await request(server).post('/api/cars').send(badCar)
      expect(res.status).toBe(400)
      expect(res.body).toHaveProperty('message', 'vin abc is invalid')
    }, 500)
    test('[12] responds with a 400 and proper error on non-unique vin', async () => {
      await request(server).post('/api/cars').send(cars[0])
      const res = await request(server).post('/api/cars').send(cars[0])
      expect(res.body).toHaveProperty('message', 'vin 11111111111111111 already exists')
    }, 500)
  })
})
