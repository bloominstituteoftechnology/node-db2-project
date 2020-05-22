const express = require('express')

const db = require('./data/dbConfig.js')

const server = express()
server.use(express.json());

server.get('/', (req, res) => {
    res.send('Server is Running...')
})

server.get('/car', async (req, res) => {
    try {
        const data = await db('cars')
        res.status(200).json(data)
    }
    catch{
        res.status(500).json('No Data found')
    }
})

server.post('/car', async (req, res) => {
    const postData = req.body
    try {
        const car = await db.insert(postData).into('cars');
        if (car) {
            res.status(201).json({ message: 'New Car added' })
        } else {
            res.status(400).json({ message: 'Error adding Car' })
        }
    }
    catch{
        res.status(500).json({ errMessage: 'Error postting' })
    }
})
module.exports = server