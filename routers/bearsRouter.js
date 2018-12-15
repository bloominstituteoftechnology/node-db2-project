//create router
const express = require('express');
const router = express.Router();

////Create db / knex connection
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

//custom middleware
const verify = require('../middleware')


//ROUTE HANDLERS / ENDPOINTS
//SELECT - GET
router.get('/', (req, res) =>{
    db('bears')
    .then(bears =>{
      res.status(200).json(bears)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve bears"})
    })

});

//SELECT W/WHERE - GET BY ID
router.get('/:id', (req, res) =>{
    const id = req.params.id;

    db('bears')
    .where('id', id)
    .then(bear =>{
      if(bear[0]){
        res.status(200).json(bear);
      }else{
        res.status(404).json({error: "The specified bear does not exist"})
      }
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to retrieve specified bear"})
    })
});

//INSERT - POST
router.post('/', verify.checkName, (req, res) =>{ 
    const newBear = req.body;

    db('bears')
    .insert(newBear)
    .then(id =>{
      res.status(201)
      res.json(id)
    })
    .catch(err =>{
      res.status(500).json({error: "Unable to add new bear"})
    })
});

//UPDATE - PUT
router.put('/:id', verify.checkName, (req, res) =>{
    const id = req.params.id;
    const updatedBear = req.body;

    db('bears')
    .where('id', id)
    .update(updatedBear)
    .then(count =>{
      if(count){
        res.status(200).json(count)
      }else{
        res.status(404).json({error: "The specified bear id does not exist"})
      }
    })
    .catch(err =>{
        res.status(500).json({error: "Unable to update the specified bear"})
    })
});

//DELETE 
router.delete('/:id', (req, res) =>{
  const id = req.params.id;

  db('bears')
  .where('id', id)
  .del()
  .then(count =>{
    if(count){
      res.status(200).json(count)
    }else{
      res.status(404).json({error: "The specified bear id does not exist"})
    }
  })
  .catch(err =>{
    res.status(500).json({error: "Unable to delete specified bear"})
  })
});

module.exports = router;