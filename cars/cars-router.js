const express = require('express');
const knex = require('knex');

const knexConfig = require('../knexfile');

const db = knex(knexConfig.development);

const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
        res.json(cars);
    })
    .catch(err => res.status(500).json({
        message: 'Failed to retreive cars'
    }))
});

modules.export = router;