const router = require("express").Router();
const knex = require("knex");

const knexConfig = {
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./data/bears.db3"
  }
};

const db = knex(knexConfig);

router.get("/", (req, res) => {
  db("bears")
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});



router.post("/", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ msg: "please provide a name" });
  } else {
    db("bears")
      .insert(req.body, "id")
      .then(ids => {
        db("bears")
          .where({ id: ids[0] })
          .first()
          .then(bear => {
            res.status(200).json(bear);
          })
          
      }) 
      .catch(err => {
        res.status(500).json(err);
      });   
    
      
  }
});


router.delete("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} deleted`
        });
      } else {
        res.status(400).json({ message: "no such id exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .first()
    .then(bear => {
      if (bear) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({ message: "no such id exists" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.put("/:id", (req, res) => {
  db("bears")
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({
          message: `${count} ${count > 1 ? "records" : "record"} updated`
        });
      } else {
        res.status(400).json({ message: "this zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});







module.exports = router;
