const express = require('express');
const db = require('../data/dbConfig.js');
const router = express.Router();

router.get('/', (req, res) => {
    db('cars')
    .then(cars => {
      res.json(cars); 
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to retrieve fruits' });
    });
});

router.post("/", async (req, res) => {
        const { body } = req;

        db('cars')
            .insert(body, 'id')
            .then(post => {
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({ error: 'Error posting car.'})
            })
  });





module.exports = router;