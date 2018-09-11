const express = require("express");
const helmet = require("helmet");

const knex = require("knex");
const dbconfigure = require("./knexfile");
const db = knex(dbconfigure.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/zoos", (req, res) => {
  db("zoos")
    .select("name")
    .then(zoo => {
      res.status(201).json(zoo);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "could not retrieve data" });
    });
});

server.get("/zoos/:id", (req, res) => {
  if (db.select("zoos").where({ id: req.params.id })) {
    db("zoos")
      .select("name")
      .where({ id: req.params.id })
      .then(zoo => {
        res.status(200).json(zoo);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error fetching data" });
      });
  } else {
    res.status(404).json({ message: "There is no zoo with the specified ID" });
  }
});

server.post("/zoos", (req, res) => {
  const zoo = req.body;
  if (zoo != null && zoo.name != "") {
    db("zoos")
      .insert(zoo)
      .then(ids => {
        res.status(201).json(ids);
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({ message: "error posting data" });
      });
  } else {
    res.status(400).json({ error: "zoo name is required" });
  }
});

server.put("/zoos/:id", (req, res) => {
  db("zoos")
    .where({ id: req.params.id })
    .update(req.body)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "could not update data" });
    });
});

server.delete("/zoos/:id", (req, res) => {
  db("zoos")
    .delete()
    .where({ id: req.params.id })
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error deleting data!" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
