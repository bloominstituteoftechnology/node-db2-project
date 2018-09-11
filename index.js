const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
  res.send("api is running");
});
// endpoints here
//======================================================================================
//GET

//ZOOS
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

//BEARS
server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => res.status(500).json(err));
});
//======================================================================================
// POST

//ZOOS
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

//BEARS
server.post("/api/bears", (req, res) => {
  const bear = req.body;

  db.insert(bear)
    .into("bears")
    .then(id => res.status(201).json(id))
    .catch();
});
//======================================================================================
// GET by ID

//ZOOS
server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

//BEARS
server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});
//======================================================================================
// PUT

//ZOOS
server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) res.status(400).json({ msg: "Please provide a name" });

  db("zoos")
    .where({ id })
    .update({ name })
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

//BEARS
server.put("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) res.status(400).json({ msg: "Please provide a name" });

  db("bears")
    .where({ id })
    .update({ name })
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});
//======================================================================================
//DELETE

//ZOOS
server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

//BEARS
server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({id})
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => res.status(500).json(err));
});

//======================================================================================
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
