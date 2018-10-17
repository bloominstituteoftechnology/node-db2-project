const express = require('express');

// Bringing in Knex
const knex = require('knex');
// Instantites the SQLite database table
const knexConfig = require('../knexfile.js');
// Configures the SQLite database using knex
const zooDb = knex(knexConfig.development);


const router = express.Router();


// get
router.get('/', (req, res) => {
    db('zoos')
      .then(zoos => {
        res.status(200).json(zoos);
      })
      .catch(err => {
        res.status(500).json(err);
      })
  });
  
  // get by id 
  router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
  
        const zoo = await db('zoos')
          // when using where, the api returns a collection
          // meaning an array with nested object returns
          .where({ id })
          .first() // or { id[0] }
          if(zoo) {
            res.status(200).json(zoo);
          } else {
            res.status(404).json({ message: `Zoo ID ${id} does not exhist`})
          }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // create 
  router.post('/', (req, res) => {
    const zoo = req.body;
    db.insert(zoo).into('zoos')
      .then(ids => {
        res.status(201).json(ids)
      })
      .catch(err => {
        res.status(500).json(err);
      })
  });
  
  // update
  router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const changes = req.body;
  
        const updatedZoo = await db('zoos')
          .where({ id })
          .update(changes)
          if(!updatedZoo || updatedZoo < 1) {
            res.status(404).json({ message: `Record with ID ${id} does not exhist`})
          } else {
            res.status(200).json({ message: `${updatedZoo} Zoo was modified`});
          }
    } catch (error) {
      res.status(500).json(error);
    }
  });
  // delete
  router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
  
        const zoo = await db('zoos')
          // when using where, the api returns a collection
          // meaning an array with nested object returns
          .where({ id })
          .delete()
          if(zoo) {
            res.status(200).json(zoo);
          } else {
            res.status(404).json({ message: `Zoo ID ${id} does not exhist`})
          }
    } catch (error) {
      res.status(500).json(error);
    }
  });

  module.exports = router;