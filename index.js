const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// get zoos
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// get zoo by id
server.get("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .first()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => res.status(500).json(err));
});

// post new zoo
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo) {
    res.status(400).json({ message: "provide a zoo name" });
  }
  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => res.status(500).json(err));
});

// put (edit zoo at id)
server.put("/api/zoos/:id", (req, res) => {
  const zoo = req.body;
  console.log(zoo);
  db("zoos")
    .where({ id: req.params.id })
    .update(zoo)
    .then(zoo => {
      if (zoo) {
        res.status(200).json({ message: "update completed success" });
      } else {
        res.status(404).json({ message: "there is no zoo with this ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "update failiure" });
    });
});

// delete zoo at id
server.delete("/api/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "there is no zoo with this ID" });
      }
    })
    .catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
