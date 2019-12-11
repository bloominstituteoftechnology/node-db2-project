const express = require("express");

const knex = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req, res) => {
  knex
    .select("*")
    .from("cars")
    .then(gets => {
      res.status(200).json(gets);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
    knex
    .select('*')
    .from('cars')
    .where({ id: id })
    .first()
    .then(getId => {
      res.json(getId);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {

  const carPost = req.body;
    knex('cars')
    .insert(carPost, 'id')
    .then(ids => {
        const id = ids[0]
        return knex('cars')
        .where({ id })
        .then(newCar => {
          res.status(201).json(newCar);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store car" });
    });
});

router.put('/:id', (req,res) => {
const { id } = req.params
const putUpdate = req.body
knex('cars')
    .where( {id} )
    .update(putUpdate)
    .then(putter => {
        if(putter > 0){
            res.status(200).json({ message: `${putter} record(s) updated` })
        }else{
            res.status(404).json({ message: "account not found" })
        }
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({
          errorMessage: "error updating the account"
        });
      });
})
router.delete('/:id', (req,res) => {
    const { id } = req.params
    knex('cars')
    .where({id})
    .del()
    .then(gone => {
        res.status(200).json({ message: `${gone} record(s) removed` })
    })
    .catch(error => {
        console.log(error);
        res.status(500).json({ errorMessage: "error removing the post" });
    });
})



module.exports = router;
