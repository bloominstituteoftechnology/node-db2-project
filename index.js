const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

// or we could name knexConfig
const dbConfig = require("./knexfile.js");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// server sanity check
server.get("/", (req, res) => {
  res.send("API Running...");
});

// endpoints here
// post - create a new zoo in the zoos table
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  // insert into zoos
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// get - read the array of zoo objects
server.get("/api/zoos", (req, res) => {

  db("zoos")
    .select("name")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get by id - read the zoo associated with the given id
server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where("id", "=", id)
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// put
server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
    .where("id", "=", id) // or .where({ id: id })
    .update(changes)
    .then(count => {
      // count === number of records updated
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// delete
server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id }) // or .where(id, '=', id)
    .del()
    .then(count => {
      // count === number of records deleted
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Port setup
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
