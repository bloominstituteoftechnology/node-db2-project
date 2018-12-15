//create router
const express = require('express');
const router = express.Router();

////Create db / knex connection
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//custom middleware
const verify = require('../middleware')


// ROUTE HANDLERS / ENDPOINTS
//SELECT - GET
router.get('/', (req, res) =>{
    db('zoos')
    .then(zoos =>{
      res.status(200).json(zoos)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve zoos"})
    })

});

//SELECT W/WHERE - GET BY ID
router.get('/:id', (req, res) =>{
    const id = req.params.id;

    db('zoos')
    .where('id', id)
    .then(zoo =>{
      if(zoo[0]){
        res.status(200).json(zoo);
      }else{
        res.status(404).json({error: "The specified zoo does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve specified zoo"})
    })
});

//INSERT - POST
router.post('/', verify.checkName, (req, res) =>{ 
    const newZoo = req.body;

    db('zoos')
    .insert(newZoo)
    .then(id =>{
      res.status(201)
      res.json(id)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to add new zoo"})
    })
});

//UPDATE - PUT
router.put('/:id', verify.checkName, (req, res) =>{
    const id = req.params.id;
    const updatedZoo = req.body;

    db('zoos')
    .where('id', id)
    .update(updatedZoo)
    .then(count =>{
      if(count){
        res.status(200).json(count)
      }else{
        res.status(404).json({error: "The specified zoo id does not exist"})
      }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to update the specified zoo"})
    })
});

//DELETE 
router.delete('/:id', (req, res) =>{
  const id = req.params.id;

  db('zoos')
  .where('id', id)
  .del()
  .then(count =>{
    if(count){
      res.status(200).json(count)
    }else{
      res.status(404).json({error: "The specified zoo id does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({error: "Unable to delete specified zoo"})
  })
});

module.exports = router;