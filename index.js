const express = require("express");
const knex = require("knex");

const helmet = require("helmet");
const knexConfig = require("./knexfile.js");
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here//


server.get("/api/zoos", (req, res) => {
  db("zoos")
  .then(students => res.status(200).json(students))
  .catch(err => res.status(500).json(err));
});


server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
  .where({ id: id })
  .then(name => res.status(200).json(name))
  .catch(err => res.status(500).json({ error: err }));
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body

  db("zoos")
    .insert(zoo)
    .then(ids => {
     res.status(201).json(ids)
   })
   .catch(err => {
     res.status(500).json({ message: "Error inserting the zoo", err })
   })
})

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id: id })
    .delete()
    .then(count => {
      res.status(200).json({ count });
    })
    .catch(err => res.status(500).json({ error: err }));
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
  .where({ id: id })
  .update(changes)
  .then(count => {
    res.status(200).json({ count });
  })
  .catch(err => res.status(500).json({ error: err }));
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});





























