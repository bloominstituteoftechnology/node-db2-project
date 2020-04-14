const express = require('express');
const server = express()
const PORT = process.env.PORT || 5000
const helmet = require('helmet');
const carsRouter = require('./cars/carsRouter');

server.use(helmet())
server.use(express.json())

server.get('/', (req, res) => [
  res.send('Live!')
])

server.use('/api/cars', carsRouter)

server.listen(PORT, () => {
  console.log(`\n == Listening on port ${PORT} == \n`)
})