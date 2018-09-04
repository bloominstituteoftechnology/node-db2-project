const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const knex = require("knex");
const dbConfig = require("./knexfile.js");
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());
server.use(morgan("short"));

// endpoints here
server.get("/", (req, res) => {
  res.send("Started up");
});

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => res.status(500).json({ error }));
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params; 
  db('zoos')
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;
  if (!zoo.name) {
    res.status(500).json({ Error: "Must include name property" }); //REPEATING CONVERT TO FUNCTION.
  }
  db.insert(zoo)
    .into("zoos")
    .then(zooId => {
      res.status(201).json(zooId);
    })
    .catch(error => res.status(500).json({ error }));
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;
  if (!changes.name) {
    res.status(500).json({ Error: "Must include name property" }); //REPEATING CONVERT TO FUNCTION.
  }
  db("zoos")
    .where("id", "=", id)
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(error => {
      res.status(500).json(error);
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
    .catch(error => {
      res.status(500).json(error);
    });
});

//BEARS Endpoints 
server.get("/api/bears", (req,res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.get("/api/bears/:id", (req,res) => {
  const { id } = req.params; 
  db("bears")
    .where({ id })
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.post("/api/bears", (req,res) => {
  const bear = req.body; 
  console.log(bear)
  if(!bear.name){
    res.status(500).json({ Error: "Must include name property" }); //REPEATING CONVERT TO FUNCTION.
  }
  db.insert(bear)
    .into("bears")
    .then(bearId => {
      res.status(201).json(bearId)
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

server.put("/api/bears/:id", (req,res) => {
  const changes = req.body;
  const { id } = req.params; 
  if(!changes.name){
    res.status(500).json({ Error: "Must include name property" }); //REPEATING CONVERT TO FUNCTION.
  }
  db("bears")
    .update(changes)
    .where({ id })
    .then(count => {
      res.status(200).json(count)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

server.delete("/api/bears/:id", (req,res) => {
  const { id } = req.params; 
  db("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})


const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
