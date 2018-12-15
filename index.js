//general requires
const express = require('express');
const helmet = require('helmet');

//knex requires
const knex = require("knex");
const dbConfig = require("./knexfile");
const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

//INSERT INTO zoos (name) VALUES ("Dan's Zoo of Swag")
server.post("/api/zoos", (req, res) => {
  const data = req.body;
  data.name ? 
    db("zoos").insert(data)
      .then(id => {
        res.status(201).json(id);
      })
      .catch(err => {
        res.status(500).json({error: "Failed to add user"});
      })
  : res.status(401).json({error: "Please provide a name"});
});

//SELECT * FROM zoos
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(rows => {
      rows.length > 0 ? res.json(rows) : res.status(404).json({message: "No records found"});
    })
    .catch(err => {
      res.status(500).json({error: "Failed to get rows"});
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

server.delete("/api/zoos:id", (req, res) => {

});

server.put("/api/zoos:id", (req, res) => {

});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
