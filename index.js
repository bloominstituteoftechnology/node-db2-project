const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const knex = require("knex");
const dbConfig = require("./knex");
const db = knex(dbConfig.development);

// endpoints here
server.post("/api/zoos", (req, res) => {
  const data = req.body;
  data.name ? 
    db("zoos").insert(data)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({error: "Failed to add Zoo"});
      })
  : res.status(400).json({error: "Please provide a Zoo name"});
});
 //SELECT * FROM zoos
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(rows => {
      rows.length > 0 ? res.json(rows) : res.status(404).json({message: "No records found"});
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get Zoo"});
    });
});
 //SELECT * FROM zoos WHERE id = :id
server.get("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos").where("id", id)
    .then(rows => {
      rows.length > 0 ? res.json(rows) : res.status(404).json({error: "Zoo not found"})
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get Zoo"});
    });
});
 //DELETE FROM zoos WHERE id = :id
server.delete("/api/zoos/:id", (req, res) => {
  const id = req.params.id;
  db("zoos").where("id", id).del()
    .then(rowCount => {
      rowCount > 0 ? res.status(201).json(rowCount) : res.status(404).json({error: "Record does not exist"});
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({error: "Failed to remove Zoo"});
    });
});
 //UPDATE FROM zoos WHERE id = :id
server.put("/api/zoos/:id", (req, res) => {
  const data = req.body;
  const id = req.params.id;
  data.name ?
    db("zoos").where("id", id).update(data)
      .then(rowCount => {
        rowCount ? res.json(rowCount) : res.status(404).json({error: "record does not exist"})
      })
      .catch(err => {
        res.status(500).json({error: "Failed to update Zoo"});
      })
  : res.status(400).json({error: "Please provide Zoo name"});
});


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
