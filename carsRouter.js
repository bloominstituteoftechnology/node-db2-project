const express = require('express')

const carsRouter = express.Router()
const db = require('./dbConfig')

module.exports = carsRouter

carsRouter.post('/', async (req,res) => {
    try {
        const resp = await db('cars').insert(req.body)
        res.status(201).json({resp})
              
    } catch (error) {
        res.status(500).json({message: 'something went wrong!'})
    }
})

carsRouter.get('/', async (req,res) => {
    try {
        const cars = await db('cars')
        res.status(200).json({cars})

    } catch (error) {
        res.status(500).json({message: 'something went wrong!'})
    }
})

