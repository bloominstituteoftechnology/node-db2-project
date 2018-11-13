const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const knexConfig = require("./knexfile");

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => res.status(200).json(zoos))
    .catch(err => res.status(500).json({error: "Some useful error message"}));
});

server.get("/api/zoos/:id", (req, res) => {
  const {id} = req.params;
  db("zoos")
    .where({id})
    .then(zoo => {
      zoo.length > 0
        ? res.status(200).json(zoo)
        : res.status(404).json({error: "zoo doesn't exist"});
    })
    .catch(err => res.status(500).json(err));
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db("zoos")
    .insert(zoo)
    .then(id => res.status(201).json(id))
    .catch(err => res.status(500).json(err));
});

server.delete("/api/zoos/:id", (req, res) => {
  const {id} = req.params;

  db("zoos")
    .where({id})
    .del()
    .then(count => {
      count > 0
        ? res.status(200).json({success: `${count} zoo deleted`})
        : res
            .status(404)
            .json({error: "zoo doesn't exist or has been deleted"});
    })
    .catch(err => res.status(500).json(err));
});

server.put("/api/zoos/:id", (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  db("zoos")
    .where({id})
    .update(changes)
    .then(count => {
      count > 0
        ? res.status(201).json({success: `${count} zoo updated`})
        : res
            .status(404)
            .json({error: "zoo doesn't exist or has been deleted"});
    })
    .catch(err => res.status(500).json(err));
});

// STRETCH

server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => res.status(200).json(bears))
    .catch(err => res.status(500).json(err));
});

server.get("/api/bears/:id", (req, res) => {
  const {id} = req.params;
  db("bears")
    .where({id})
    .then(bear => {
      bear.length > 0
        ? res.status(200).json(bear)
        : res.status(404).json({error: "Bear not found"});
    });
});

server.post("/api/bears", (req, res) => {
  const bear = req.body;
  db("bears")
    .insert(bear)
    .then(id => res.status(200).json(id))
    .catch(err => res.status(500).json(err));
});

server.delete("/api/bears/:id", (req, res) => {
  const {id} = req.params;
  db("bears")
    .where({id})
    .del()
    .then(count => {
      count > 0
        ? res.status(200).json({success: `${count} bear deleted`})
        : res.status(404).json({error: "Bear not found"});
    })
    .catch(err => res.status(500).json({error: "idk what went wrong"}));
});

server.put("/api/bears/:id", (req, res) => {
  const {id} = req.params;
  const change = req.body;

  db("bears")
    .where({id})
    .update(change)
    .then(count => {
      count > 0
        ? res.status(201).json({success: `${count} bear updated`})
        : res.status(404).json({error: "Bear not found"});
    })
    .catch(err => res.status(500).json({error: "something went wrong"}));
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
