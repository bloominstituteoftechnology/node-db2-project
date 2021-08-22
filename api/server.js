const express = require('express')
const helmet = require('helmet')
const router = require('./cars/cars-router.js')

const server = express()

server.use(express.json())
server.use(helmet())
server.use('/api/cars', router)

server.get('/', (req, res) => {
  res.status(200)
    .json({ api: 'up' })
})

module.exports = server
