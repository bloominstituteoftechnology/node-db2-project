const request = require('supertest')
const server = require('../../api/server')
const db = require('../../data/db-config')


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
