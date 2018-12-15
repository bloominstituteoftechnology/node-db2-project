const express = require('express');
const knex = require('knex');
const router = express.Router();

const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

router.post('/', (req, res) => {
    const zoo = req.body;
    db('zoos').insert(zoo)
    .then(ids => {
        res.status(201).json(ids);
    })
    .catch(err => {
        res.status(500).json({error: "Failed to insert zoo"});
    });
});

router.get('/', (req, res) => {
    res.send('get request');
});

router.get('/:id', (req, res) => {
    res.send('get request with id');
});

router.put('/:id', (req, res) => {
    res.send('put request');
});

router.delete('/:id', (req, res) => {
    res.send('delete request');
});

module.exports = router;