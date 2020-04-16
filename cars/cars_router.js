const express = require("express");
const db = require("../data/db-config");

const router = express.Router();

router.get ('/', (req,res)=>{
    db('carr')
    .then(cars=>{
        res.json(cars);
    })
    .catch(err =>{


        res.status(500).json({message: "Failed to retreive data"})
    })
});

router.get('/:id', (req, res)=>{
    const {id}= req.params;
    db("carr").where({id}).first()
    .then(cars =>{
        res.json(cars);
    })
    .catch( err=>{
        res.status(500).json({message: "Failed to retreive cars by id" })
    });

});
router.post("/", (req, res) => {
    db("carr")
      .insert(req.body, "id") 
      .then(ids => {
        res.status(201).json({ newID: ids }); 
      })
    .catch(err =>{
        console.log('Post error', err);
        res.status(500).json({message: "Failed to store data"})
    });
});
router.put('/:id', (req, res) => {
    const changes = req.body;
  
    db("carr")
      .where({ id: req.params.id })
      .update(changes)
      .then((count) => {
        if (count > 0) {
          res.status(200).json({ message: "record updated successfully" }); // worked on insomnia
        } else {
          res.status(400).json({ message: "account not updated" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: "sorry, ran into an error" });
      });
    });
    router.delete('/:id', (req, res) => {
        db("carr")
          .where({ id: req.params.id })
          .del()
          .then((count) => {
            if(count > 0) {
              res.status(200).json({ message: "record deleted successfully" });
            } else {
              res.status(400).json({ message: "car not found" });
            }
          })
          .catch(error => {
            res.status(500).json({ message: "Sorry, ran into an error" });
          })
      })
module.exports = router;