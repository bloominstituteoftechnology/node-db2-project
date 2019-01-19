const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

router.post('/', (req, res) => {

    const zoo = req.body;

    if (zoo.name) {
        db('zoos').insert(zoo)
            .then(zooId => {
                res.status(200).json(zooId)
            })
            .catch(err => {
                res.status(500).json({ message: 'Could not insert zoo' })
            })
    } else {
        res.status(400).json({ message: 'Missing name' })
    }
})

router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
            res.status(200).json(zoos)
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not get zoos' })
        })
})

router.get('/:id', (req, res) => {

    const { id } = req.params;

    db('zoos').where('id', id)
        .then(zoo => {
            res.status(200).json(zoo)
        })
        .catch(err => {
            res.status(500).json({ message: 'Could not get zoo' })
        })
})

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const zoo = req.body;

    if (zoo.name) {
        db('zoos').where('id', id).update(zoo)
            .then(zooCount => {
                res.status(200).json('zoo has been updated')
            })
            .catch(err => {
                res.status(500).json({ message: 'Could not update zoo' })
            })
    } else {
        res.status(400).json({ message: 'Missing name' })
    }
})

router.delete('/:id', (req, res) => {

    const { id } = req.params;

    db('zoos').where('id', id).del()
        .then(zooCount => {
            res.status(201).json('zoo has been deleted')
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to delete zoo' })
        })
})

module.exports = router;