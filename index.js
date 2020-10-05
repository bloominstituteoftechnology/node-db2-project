const express = require('express')
const server = express()
const carDealer = require('./models/dbHelpers')

server.use(express.json())

const PORT = 3001

server.get('/', (req, res)=> {
 res.send({message: 'Server Running Smooth'})
})

server.post('/api/cars', (req, res) => {
    carDealer.add(req.body)
    .then(cardealer => {
        res.status(200).json(cardealer)
    })
    .catch(error => {
        res.status(500).json({message: errors})
    })
})



server.listen(PORT, () => {
    console.log(`Server UP ${PORT}`)
})