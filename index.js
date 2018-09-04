const express = require("express");
const helmet = require("helmet");
const knex = require("knex");
const dbconfig = require("./knexfile");
const db = knex(dbconfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

server.get("/zoos", (req, res) => {
  db("zoos")
    .then(zoo => {
      res.status(201).json(zoo);
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "error fetching data" });
    });
});

server.get("/zoos/:id", (req, res) => {
    db("zoos")
      .select("name")
      .where({ id: req.params.id })
      .then(zoo => {
        console.log(zoo);
        if (zoo.length === 0){
          res
          .status(404)
          .json({ message: "The zoo with the specified ID does not exist" });
        } else {
        res.status(200).json(zoo);}
      })
      .catch(err => {
        console.log("error", err);

        res.status(500).json({ message: "error fetching data" });
      });
  
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
    res.status(400).json({ error: "Please provide a zoo name" });
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
      res.status(500).json({ message: "error updating data" });
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
      res.status(500).json({ message: "error deleting data" });
    });
});

server.listen(3300, () =>
  console.log("\n=== Web API Listening on port 3300 ===\n")
);
