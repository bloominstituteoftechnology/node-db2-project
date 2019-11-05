const express = require('express')
const helmet = require('helmet')
const knex = require('knex')

const knexfile = require('./knexfile')

const db = knex(knexfile.development)
const server = express()

server.use(helmet())
server.use(express.json())

server.get('/api/cars', (req, res) => {
    db('cars')
    .then(resp => {
        // console.log(resp)
        res.json(resp)
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.get('/api/cars/:id', (req, res) => {
    const id = req.params.id

    db('cars').where({id}).first()
    .then(resp => {
        // console.log(resp)
        if (resp) res.json(resp)
        else res.status(404).json({message: 'car id not found', id})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.post('/api/cars', validateCarBody, (req, res) => {
    const {vin, make, model, mileage, transmission_type, title_status} = req.body

    db('cars').insert({vin, make, model, mileage, transmission_type, title_status})
    .then(([id]) => {
        // console.log(resp)
        res.status(201).json({id})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

server.delete('/api/cars/:id', (req, res) => {
    const id = req.params.id

    db('cars').where({id}).del()
    .then(resp => {
        // console.log(resp)
        if (resp) res.sendStatus(204)
        else res.status(404).json({message: 'car id not found', id})
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
})

function validateCarBody(req, res, next) {
    if (!req.body) return res.status(400).json({message: 'missing data body'})
    
    const {vin, make, model, mileage, transmission_type, title_status} = req.body
    
    // VIN (string) unique required
    if (!vin || typeof vin != 'string') return res.status(400).json({message: 'missing field vin: (string)', vin})
    // make (string) required
    if (!make || typeof make != 'string') return res.status(400).json({message: 'missing field make: (string)', make})
    // model (string) required
    if (!model || typeof model != 'string') return res.status(400).json({message: 'missing field model: (string)', model})
    // mileage (float) required
    if (!mileage || isNaN(mileage)) return res.status(400).json({message: 'missing field mileage: (number)', mileage})
    // transmission type (string)
    if (![null,undefined].includes(transmission_type) && typeof transmission_type != 'string') return res.status(400).json({message: 'type error: expected field transmission_type to be a string', transmission_type})
    // title status (string)
    if (![null,undefined].includes(title_status) && typeof title_status != 'string') return res.status(400).json({message: 'type error: expected field title_status to be a string', title_status})

    db('cars').where({vin})
    .then(resp => {
        // console.log(resp)
        if (resp.length) res.status(400).json({message: 'unique constraint failure: vin must be unique', vin})
        else next()
    })
    .catch(err => {
        console.error(err)
        res.sendStatus(500)
    })
}

module.exports = server