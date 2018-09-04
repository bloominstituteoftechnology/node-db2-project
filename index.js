const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const db = knex(dbConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

server.get("/", (req, res) => {
  res.send("API running....");
});

//ZOOS ENDPOINTS

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoos information could not be retrieved" });
    });
});

server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .then(zoo => {
      res.status(200).json(zoo);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The bear information could not be retrieved" });
    });
});

server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "There was an error saving the zoo to the database." });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The zoo information could not be updated" });
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
      console.log("error", err);
      res.status(500).json({ error: "The zoo could not be deleted" });
    });
});


//BEARS ENDPOINTS

server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The bears information could not be retrieved" });
    });
});

server.get("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .then(bear => {
      res.status(200).json(bear);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The bear information could not be retrieved" });
    });
});

server.post("/api/bears", (req, res) => {
  const bear = req.body;

  db.insert(bear)
    .into("bears")
    .then(id => {
      res.status(201).json(id);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "There was an error saving the bear to the database." });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const changes = req.body;
  const { id } = req.params;

  db("bears")
    .where({ id })
    .update(changes)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(500)
        .json({ error: "The bear information could not be updated" });
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
      console.log("error", err);
      res.status(500).json({ error: "The bear could not be deleted" });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
