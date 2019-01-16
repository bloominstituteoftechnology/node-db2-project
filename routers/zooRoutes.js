const express = require('express');
const knex = require('knex');

const dbConfig = require('../knexfile.js');
const db = knex(dbConfig.development);


const router = express.Router();



router.post('/', (req, res) =>{
    const zoo = req.body;
    if(!zoo.name){res.status(400).json({error:"Please include a name!"})}
      db('zoos').insert(zoo)
    .then(ids=>{
      res.status(201).json(ids)
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to add the zoo."})
    })
  })
  
  router.get('/', (req, res) =>{
    db('zoos')
    .then(zoos =>{
      if(zoos.length > 0){
        res.json(zoos)
      }else{
        res.status(404).json({error:"No zoos have been added"})
      }
    })
    .catch(err =>{
      res.status(500).json({error:"Unable to retrieve the Zoos from the database!"})
    })
    
  })
  
  router.get('/:id', async (req, res) =>{
   try {
     const { id } = req.params
  
     const zoo = await db('zoos')
     .where({ id })
     .first()
     if(zoo){
       res.json(zoo)
     }else{
       res.status(404).json({error: "The Zoo with the specified id does not exist!"})
     }
   } catch(err) {
      res.status(500).json({error:"Could not retrieve information from the database!"})
   }
  
    
  })
  
  router.delete('/:id', (req, res) =>{
    const { id } = req.params;
    db('zoos').where({ id }).del()
    .then(deletedZoo =>{
      if(deletedZoo){
        res.status(201).json({message:"Zoo deleted"})
      }else{
        res.status(404).json({error:"Unable to delete specified Zoo!"})
      }
    })
  })
  
  router.put('/:id', (req, res) =>{
    const { id } = req.params;
    const zoo = req.body;
  
    db('zoos').where({ id }).update(zoo)
    .then(count =>{
      if(count){
        db('zoos').where({ id }).then(updated =>{
          res.status(201).json(updated)
        }).catch(err =>{
          res.status(404).json({error:"No records found to updated"})
        })
      }
    }).catch(err =>{
      res.status(500).json({error:"Could not update the Zoo!"})
    })
  })
  

  module.exports = router;