const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

// endpoints here

server.get("/", (req, res) => {
  res.send("up and running...");
});

//* GET Zoos
server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

//* POST to Zoos
server.post("/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      const id = ids[0];
      res.status(201).json({ id, ...zoo });
    })
    .catch(err => res.status(500).json(err));
});

//* Get by ID
server.get("/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .select() //! <------ Knex SELECT
    .where("id", id) //! <----- WHERE id =
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
