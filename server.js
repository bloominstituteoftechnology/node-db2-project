const express = require('express');

const knex = require('./data/dbConfig');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h3>DB migrations</h3>');
});