const express = require('express');
const router = express.Router();

const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

router.get('/api/bears', (req,res) => {
    db('bears').then(bears => {
         res.status(200).json(bears);
    }).catch(err => {
     res.status(500).json({err: 'Failed to find crayon'});
    })
 });
 
 router.get('/api/bears/:id', (req,res) => {
   const {id} = req.params;
   db('bears').where('id', id)
             .then(bear => {
                res.status(200).json(bear);
            }).catch(err => {
                 res.status(500).json({err: 'Failed to find crayon'});
     })
 });
 router.post('/api/bears', (req, res) => {
     const name = req.body;
   if(name) {  
       db('bears').insert(name)
                 .then( response => {
                     console.log(response);
                     res.status(201).json(response)
                 })
                 .catch(err => {
                     res.status(500).json({err:'Something went wrong with our router..please try again.'})
                 })
     } else {
           res.status(400).json({err: 'Please enter the name'});
     }        
 });
 
 router.put('/api/bears/:id', (req,res)=> {
      const {id} = req.params;
      const name = req.body;
      if(id && name) {
           db('bears').where('id', id).update(name)
                     .then( newName => {
                         res.status(200).json(newName);
                     }).catch( err => {
                         res.status(500).json({err:'Failed to update the name this time'})
                     })
       } else {
           res.status(400).json({"error": "Please enter a valid name"})
       }         
 });
 
 router.delete('/api/bears/:id', (req,res) => {
        const {id} = req.params;
        db('bears').where('id', id).del()
               .then( response => {
                  res.json({"Message": "Deleted Successfully"})
               }).catch(err => {
                 res.status(500).json({err: 'Failed to delete crayon'});
               });
 });
 
 module.exports = router;