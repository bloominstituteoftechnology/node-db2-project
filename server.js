const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const knex = require('./data/dbConfig');
const server = express();
const settings = [express.json(), helmet(), morgan('combined')];
server.use(settings);

server.get('/', (req, res) => {
    knex.select('*').from('cars')
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ errorMessage: err }))
})

server.post('/', (req, res) => {
    knex.insert(req.body).into('cars')
    .then(car => res.status(200).json(car))
    .catch(err => res.status(500).json({ errorMessage: err }))
})

module.exports = server