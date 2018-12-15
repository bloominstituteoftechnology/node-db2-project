const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");
const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

// endpoints here
// `POST /api/zoos`
server.post("/zoos", (req, res) => {
  const zoo = req.body;
  if (zoo.name) {
    db("zoos")
      .insert(zoo)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "Oops. There's a problem inserting that data" });
      });
  } else {
    res.status(400).json({ message: "What are you, stupid? You need a name!" });
  }
});

// `GET /api/zoos`
server.get("/zoos", (req, res) => {
  db("zoos")
    .then(rows => {
      res.json(rows);
    })
    .catch(err => {
      res.status(500).json({ message: "You done screwed something up" });
    });
});

// `GET /api/zoos/:id`
server.get("/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where("id", id)
    .then(row => {
      res.json(row);
    })
    .catch(err => {
      res.status(500).json({ message: "Dammit!" });
    });
});

// DELETE /api/zoos/:id
server.delete("/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where("id", id)
    .del()
    .then(num => {
      if (num) {
        res.json({ message: "This item has been deleted" });
      } else {
        res.status(404).json({ message: "This ID doesn't exist" });
      }
    })
    .catch(err => {
      res.status(500).json({
        message:
          "Jeez! Why I even bother using this stupid database if it's just going to keep screwing up like this?!?"
      });
    });
});

// PUT /api/zoos/:id
server.put('/zoos/:id', (req, res) => {
  const {id} = req.params;
  const zoo = req.body;
  if (zoo.name) {
  db('zoos').where('id', id).update(zoo).then(num => {
    if (num) {
      db('zoos').where('id', id).then(row => res.json(row))
    } else {
      res.status(404).json({ message: "That ID isn't available"})
    }
  }).catch(err => {
    res.status(500).json({ message: "This just isn't worth it if the database won't meet us halfway here."})
  })} else {
    res.status(400).json({ message: "You need to actually enter the name, you moron."})
  }
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
