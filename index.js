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
server.get("/api/bears", (req, res) => {
  DB("bears")
    .then(rows => {
      res.json(rows);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "There was an error retrieving bears from database." });
    });
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  DB("bears")
    .select()
    .where({ id: id })
    .then(bear => {
      res.json(bear);
    })
    .catch(() => {
      res
        .status(500)
        .json({ error: "There was an error retrieving bear from database." });
    });
});

server.post("/api/bears", (req, res) => {
  const bear = req.body;
  if (bear.name) {
    DB("bears")
      .insert(bear)
      .then(nums => {
        res.status(201).json(bear);
      })
      .catch(() => {
        res
          .status(500)
          .json({ error: "There was an error adding bear to database." });
      });
  }
});

server.delete('/api/bears/:id', (req, res) => {
  const { id } = req.params
  DB('bears')
  .where({ id })
  .del()
  .then((nums) => {
   res
    .json(nums)
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error removing bear from database."})
  })
 })
 
const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
