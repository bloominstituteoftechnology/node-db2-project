const express = require("express");
const helmet = require("helmet");

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .select("name")
    .then(ids => res.status(200).json(ids))
    .catch(err => res.status(500).json({ error: "Could not retrieve data" }));
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .get(id)
    .then(ids => {
      if (ids) {
        res.status(200).json(ids);
      } else {
        res
          .status(404)
          .json({ error: `Zoo with id of ${id} could not be found` });
      }
    })
    .catch(err => res.status(500).json({ error: "Could not retrieve data" }));
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  if (!zoo) res.status(400).json({ errMsg: "Please provide a zoo" });

  db.insert(zoo)
    .into("zoos")
    .then(ids => res.status(201).json(ids[0]))
    .catch(err =>
      res.status(500).json({
        error: `Could not retrieve data`
      })
    );
});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => res.status(200).json(count))
    .catch(err =>
      res.status(404).json({ error: `Zoo with id of ${id} could not be found` })
    );
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .del()
    .then(count => res.status(200).json(count))
    .catch(err =>
      res.status(404).json({ error: `Zoo with id of ${id} could not be found` })
    );
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

const knex = require("knex");
const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);
