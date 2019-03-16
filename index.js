const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const knex = require("knex");
const knexDB = require("./knexfile");
const zooDB = knex(knexDB.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger("tiny"));

// zoo endpoints here

server.get("/api/zoos", (req, res) => {
  zooDB("zoos")
    .then(zoos => {
      res.json(zoos);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "Unable to retrieve list of zoos from the DB." });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  zooDB("zoos")
    .where("id", id)
    .then(rows => {
      res.json(rows);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Failed to find a zoo with this ID in the DB." });
    });
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (zoo.name) {
    zooDB("zoos")
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "Failed to insert the zoo into the database." });
      });
  } else {
    res.status(400).json({ error: "Name required to insert zoo into the DB." });
  }
});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const zoo = req.body;

  if (zoo.name) {
    zooDB("zoos")
      .where("id", id)
      .update(zoo)
      .then(zooCount => {
        res.status(200).json("zoo has been updated");
      })
      .catch(err => {
        res.status(500).json({ message: "Could not update zoo" });
      });
  } else {
    res.status(400).json({ message: "Missing name" });
  }
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  zooDB("zoos")
    .where({ id: id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: `404 - zoo with id ${id} not found.` });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//bears

server.get("/api/bears", (req, res) => {
  zooDB("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  zooDB("bears")
    .where("id", id)
    .then(bear => {
      if (bear.length) {
        res.status(200).json(bear);
      } else {
        res.status(404).json({
          error: "The bear with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

server.post("/api/bears", (req, res) => {
  const bear = req.body;
  if (!bear.name) {
    res
      .status(404)
      .json({ error: "Please provide complete bear information." });
    return;
  }
  zooDB("bears")
    .insert(bear)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding bear to server", err });
    });
});

const port = 9090;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
