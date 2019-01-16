const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);

const router = express.Router();



router.post('/', (req, res) =>{
    const bear = req.body;
    if(!bear.name){res.status(400).json({error:"Please include a name!"})}
      db('bears').insert(bear)
    .then(ids=>{
      res.status(201).json(ids)
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to add the bear."})
    })
  })
  
  router.get('/', (req, res) =>{
    db('bears')
    .then(bears =>{
      if(bears.length > 0){
        res.json(bears)
      }else{
        res.status(404).json({error:"No bears have been added"})
      }
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to retrieve the bears from the database!"})
    })
    
  })
  
  router.get('/:id', async (req, res) =>{
   try {
     const { id } = req.params
  
     const bear = await db('zoos')
     .where({ id })
     .first()
     if(bear){
       res.json(bear)
     }else{
       res.status(404).json({error: "The bear with the specified id does not exist!"})
     }
   } catch(err) {
      res.status(500).json({error:"Could not retrieve information from the database!"})
   }
  
    
  })
  
  router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    db('bears').where({ id }).del()
    .then(deletedBear =>{
      if(deletedBear){
        res.status(201).json({message:"Bear deleted"})
      }else{
        res.status(404).json({error:"Unable to delete specified Bear!"})
      }
    })
  })
  
  router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const bear = req.body;
  
    db('bears').where({ id }).update(bear)
    .then(count =>{
      if(count){
        db('bears').where({ id }).then(updated =>{
          res.status(201).json(updated)
        }).catch(err =>{
          res.status(404).json({error:"No records found to updated"})
        })
      }
    }).catch(err =>{
      res.status(500).json({error:"Could not update the bear!"})
    })
  })


  module.exports = router;