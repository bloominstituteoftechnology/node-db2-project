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

module.exports = server