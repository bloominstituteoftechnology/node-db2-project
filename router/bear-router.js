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

// router.post('/', (req, res) => {
//   db('bears')
//   .insert(req.params.body)
//   .then(ids => {
   
//     const [id] = ids;

//     db(bears)
//       .where({ id })
//       .first()
//       .then(bear => {
//         res.status(200).json(bear);
//       });
//   })
//   .catch(error => {
//     res.status(500).json(error);
//   });
// });

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







module.exports = router;
