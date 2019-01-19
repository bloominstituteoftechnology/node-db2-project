const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

router.post('/', (req, res) => {

    const bear = req.body;

    if (bear.name) {
        db('bears').insert(bear)
            .then(bearId => {
                res.status(200).json(bearId)
            })
            .catch(err => {
                res.status(500).json({ message: 'Could not insert bear' })
            })
    } else {
        res.status(400).json({ message: 'Missing name' })
    }
})

router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res.status(200).json(bears)
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not get bears' })
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params;

    db('bears').where('id', id)
        .then(bear => {
            res.status(200).json(bear)
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not get bear' })
        })
})

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const bear = req.body;

    if (bear.name) {
        db('bears').where('id', id).update(bear)
            .then(bearCount => {
                res.status(200).json('bear has been updated')
            })
            .catch(err => {
                res.status(500).json({ message: 'Could not update bear' })
            })
    } else {
        res.status(400).json({ message: 'Missing name' })
    }
})

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    db('bears').where('id', id).del()
        .then(bearCount => {
            res.status(201).json('bear has been deleted')
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete bear' })
        })
})

module.exports = router;