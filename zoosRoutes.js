const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const router = express.Router();

router.post('/', (req, res) => {
    const zoo = req.body;
    db('zoos').insert(zoo)
        .then(ids => {
            res
                .status(201)
                .json(ids)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Unable to add zoo."})
        })
});

router.get('/', (req, res) => {
    db('zoos')
        .then(rows => {
            res
                .status(201)
                .json(rows)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Unable to load zoos" })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('zoos').where('id', id)
        .then(zoo => {
            res
                .status(201)
                .json(zoo)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to retrieve requested zoo" })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const zoo = req.body;
    db('zoos').where('id', id).update(zoo)
        .then(rowCount => {
        res
            .status(201)
            .json(rowCount)
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "Unable to update specified zoo"})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('zoos').where('id', id).del()
    .then(rowsDeleted => {
        res
            .status(201)
            .json(rowsDeleted)
    })
    .catch(err => {
        res
            .status(500)
            .json({ message: "Unable to delete zoo" })
    })
})

module.exports = router;