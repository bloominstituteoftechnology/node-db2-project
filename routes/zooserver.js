const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development);

router.get('/', (req, res) => {
    db('zoos')
        .then(zoos => {
            res
                .status(200)
                .json(zoos);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('zoos').where('id', id)
        .then(zoo => {
            if (zoo.length) {
                res
                    .status(200)
                    .json(zoo);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The zoo with the specified ID does not exist."
                    })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({
                    error: err
                })
        })
})

router.post('/', (req, res) => {
    const zoo = req.body;
    if (!zoo.name) {
        res.status(404)
            .json({ error: "Please provide complete zoo information." })
        return
    }
    db('zoos').insert(zoo)
        .then(id => {
            res
                .status(201)
                .json(id)
        }).catch(err => {
            res
                .status(500)
                .json({ error: "Error adding zoo to server", err })
        })
})

router.put('/:id', (req, res) => {
    const zoo = req.body;
    const { id } = req.params;
    if (!zoo.name || !id) {
        res.status(404)
            .json({ error: "Please provide zoo information and/or ID." })
        return
    }
    db('zoos').where('id', id).update(zoo)
        .then(id => {
            if (id) {
                res
                    .status(201)
                    .json(id);
            } else {
                res
                    .status(404)
                    .json({ error: "The zoo with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The zoo could not be updated", err })
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('zoos').where('id', id).del()
        .then((count) => {
            if (count) {
                res
                    .status(200)
                    .json(count);
            } else {
                res
                    .status(404)
                    .json({ error: "The zoo with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The zoo could not be removed" })
        })
});

module.exports = router;