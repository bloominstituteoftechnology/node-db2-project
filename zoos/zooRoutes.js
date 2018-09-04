const knex = require('knex');
const express = require('express');

const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

const router = express.Router();
  
router.get('/', (req, res) => {
db('zoos')
    // .select('name')
    .then(zoos => {
    res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json({ errorMessage: 'The zoos information could not be retrieved.' }));
})

router.post('/', (req, res) => {
const zoo = req.body;

db.insert(zoo)
    .into('zoos')
    .then(id => {
    res.status(201).json(id);
    })
    .catch(err => res.status(500).json({ errorMessage: 'There was an error while saving the post to the database' }));
});

router.put('/:id', (req, res) => {
const changes = req.body;
const { id } = req.params;

db('zoos')
    .where('id', '=', id)
    .update(changes)
    .then(count => {
    res.status(200).json({ message: `Update succesful. ${count} record updated.` })
    })
    .catch(err => {
    res.status(500).json({ errorMessage: 'Update failed.'})
    });
});

router.delete('/:id', (req, res) => {
const { id } = req.params;

db('zoos')
    .where({ id })
    .del()
    .then(count => {
    res.status(200).json({ message: `${count} record(s) deleted.`})
    })
    .catch(err => {
    res.status(500).json({ errorMessage: 'Oops! There was an error when trying to delete the record.' })
    });
}); 

module.exports = router;