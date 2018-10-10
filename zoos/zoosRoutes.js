const express = require('express');

const zoos = require('./zoosModel');

const router = express.Router();


// Create Zoos
router.post('/', (req, res) => {
    const name = req.body;
    console.log(name);
    zoos
    .add(name)
    .then(zooId => {
        res.status(201).json( zooId )
        })
        .catch(err => res.status(500).json(err))
    });
    
   //Get a list of Zoos 
  router.get('/', (req, res) => {
    zoos
    .find()
    .then(zoos => {
      res
        .status(200)
        .json(zoos)
    })
      .catch(err => res.send(err))
  });


  //Get a Zoo by ID
  router.get('/:id', async (req, res) => {
    try {
  
      const { id } = req.params;
      const zoo = await courses.findById(id);
        
            if(zoo) {
              res
              .status(200)
              .json(zoo)
            }
            else {
            res
            .status(404)
            .json({ message: `Nuthin' Found with ID ${id}!`})
            }
    } catch(err) {
        res
        .status(500)
        .json(err)
    }
  });
  
  //Update Zoos
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    zoos
      .update(id, changes)
      .then(count => { 
        if(!count || count < 1) {
          res
          .status(404)
          .json({message: `There is no record at ID ${id} to update. Please input a valid ID.`})
        } else {
          res
          .status(200)
          .json(count);
        }
    })
    .catch(err => res.status(500).json(err));
  });
  
  // Delete Zoos
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
      zoos
      .remove(id)
      .then(count => { 
        if(!count || count < 1) {
          res
          .status(404)
          .json({message: `There is no record at ID ${id} to delete. Please input a valid ID.`})
        } else {
          res
          .status(200)
          .json(count);
        }
    })
    .catch(err => res.status(500).json(err));
    
  });

  module.exports = router;