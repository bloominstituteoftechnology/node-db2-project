const express = require('express');
const knex = require('knex');
const Cars = require('../cars/car-model')

const router = express.Router();

router.get('/', (req, res) => {
    Cars.getAll()
    .then(item => {
        res.json(item)
    })
    .catch(err => {
        res.status(500).json({message: 'unable to GET'})
    })
})

router.get('/:id', (req, res) => {

})

router.post('/', (req, res) => {

})

router.put('/:id', (req, res) => {

})

router.delete('/', (req, res) => {

})
module.exports = router;