const express = require('express');
const knex = require('knex');
const dbConfig = require('./knexfile');
const db = knex(dbConfig.development);
const router = express.Router();

router.post('/', (req, res) => {
    const bear = req.body;
    db('bears').insert(bear)
        .then(ids => {
            res
                .status(201)
                .json(ids)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Unable to add bear."})
        })
});

router.get('/', (req, res) => {
    db('bears')
        .then(rows => {
            res
                .status(201)
                .json(rows)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "Unable to load bears" })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('bears').where('id', id)
        .then(bear => {
            res
                .status(201)
                .json(bear)
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to retrieve requested bear" })
        })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const bear = req.body;
    db('bears').where('id', id).update(bear)
        .then(rowCount => {
        res
            .status(201)
            .json(rowCount)
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "Unable to update specified bear"})
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('bears').where('id', id).del()
    .then(rowsDeleted => {
        res
            .status(201)
            .json(rowsDeleted)
    })
    .catch(err => {
        res
            .status(500)
            .json({ message: "Unable to delete bear" })
    })
})

module.exports = router;