import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'

import carsRouter from './routers/carsRouter'

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use(morgan('dev'))

server.use('/api/cars', carsRouter)

server.use('/', (req, res) => {
  res.status(200).json({
    message: `Car API is working`
  })
})

export default server
