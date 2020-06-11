const express = require('express')


const db = require('../data/connection');




const router = express.Router();

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
      console.log(err)
    res.status(500).json({ message: 'Failed to retrieve cars' });
  });
});

router.post('/', (req,res)=>{
    const data = req.body
    db('cars')
    .insert(data)
    .then(item =>{
        res.status(201).json(data)
    })
    .catch(err =>{
        res.status(500).json({message: 'car info not posted'})
    })
})

module.exports = router