const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.sqlite3"
  },
  useNullAsDefault: true
});

const server = express();

server.use(express.json());
server.use(helmet());

// zoo endpoints here

server.post("/api/zoos", (req, res) => {
  const name = req.body;

  db.insert(name)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .select()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const zooId = req.params.id;

  db("zoos")
    .where("id", zooId)
    .select()
    .then(zoo => {
      if (zoo.length) {
        res.status(200).json(zoo);
      } else {
        res
          .status(404)
          .json({ message: `Could not find zoo with id ${zooId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any zoos." });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  db("zoos")
    .where("id", "=", id)
    .update(updates)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// bear endpoints here

server.post("/api/bears", (req, res) => {
  const name = req.body;

  db.insert(name)
    .into("bears")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/bears", (req, res) => {
  db("bears")
    .select()
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.get("/api/bears/:id", (req, res) => {
  const bearId = req.params.id;

  db("bears")
    .where("id", bearId)
    .select()
    .then(bear => {
      if (bear.length) {
        res.status(200).json(bear);
      } else {
        res
          .status(404)
          .json({ message: `Could not find a bear with id ${bearId}` });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get any bears." });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const updates = req.body;
  const { id } = req.params;

  db("bears")
    .where("id", "=", id)
    .update(updates)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
