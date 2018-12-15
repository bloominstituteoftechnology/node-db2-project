const express = require('express');
const router = express.Router();
const knex = require('knex');
const dbconfig = require('../knexfile');
const db = knex(dbconfig.development);

router.post('/', (req, res) => {
    const bear = req.body;
    if (!bear.name) {
        res.status(404)
            .json({ error: "Please provide complete bear information." })
        return
    }
    db('bears').insert(bear)
        .then(id => {
            res
                .status(201)
                .json(id)
        }).catch(err => {
            console.log(err)
            res
                .status(500)
                .json({ error: "Error adding bear to server", err })
        })
})
router.get('/', (req, res) => {
    db('bears')
        .then(bears => {
            res
                .status(200)
                .json(bears);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: err })
        })
})
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db('bears').where('id', id)
        .then(bear => {
            if (bear.length) {
                res
                    .status(200)
                    .json(bear);
            } else {
                res
                    .status(404)
                    .json({
                        error: "The bear with the specified ID does not exist."
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
router.put('/:id', (req, res) => {
    const bear = req.body;
    const { id } = req.params;
    if (!bear.name || !id) {
        res.status(404)
            .json({ error: "Please provide bear information and/or ID." })
        return
    }
    db('bears').where('id', id).update(bear)
        .then(id => {
            if (id) {
                res
                    .status(201)
                    .json(id);
            } else {
                res
                    .status(404)
                    .json({ error: "The bear with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The bear could not be updated", err })
        })
})
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db('bears').where('id', id).del()
        .then((count) => {
            if (count) {
                res
                    .status(200)
                    .json(count);
            } else {
                res
                    .status(404)
                    .json({ error: "The bear with the specified ID does not exist." })
            }
        }).catch(err => {
            res
                .status(500)
                .json({ error: "The bear could not be removed" })
        })
});

module.exports = router;