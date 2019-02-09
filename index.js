const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const knex = require("knex");
const knexDB = require("./knexfile");
const DB = knex(knexDB.development);

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger("tiny"));

// endpoints here

server.get("/api/zoos", (req, res) => {
  DB("zoos")
    .then(zoos => {
      res.json(zoos);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "Unable to retrieve list of zoos from the DB." });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  DB("zoos")
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
    DB("zoos")
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
    DB("zoos")
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
  DB("zoos")
    .where("id", id)
    .del()
    .then(count => {
      if (count) {
        res.json({ message: "The zoo was successfully deleted" });
      } else {
        res.status(404).json({
          error: "The zoo with the specified ID does not exist within the DB."
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The zoo could not be removed" });
    });
});

//bears endpoints here

server.post("/api/bears", (req, res) => {
  const bear = req.body;
  if (!bear.name) {
    res
      .status(404)
      .json({ error: "Please provide complete bear information." });
    return;
  }
  DB("bears")
    .insert(bear)
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error adding bear to server", err });
    });
});
server.get("/api/bears", (req, res) => {
  DB("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  DB("bears")
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

server.put("/api/bears/:id", (req, res) => {
  const bear = req.body;
  const { id } = req.params;
  if (!bear.name || !id) {
    res
      .status(404)
      .json({ error: "Please provide bear information and/or ID." });
    return;
  }
  DB("bears")
    .where("id", id)
    .update(bear)
    .then(id => {
      if (id) {
        res.status(201).json(id);
      } else {
        res
          .status(404)
          .json({ error: "The bear with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The bear could not be updated", err });
    });
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  DB("bears")
    .where("id", id)
    .del()
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ error: "The bear with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The bear could not be removed" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
