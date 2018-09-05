const express = require("express");
const helmet = require("helmet");
const knex = require("knex");

const dbConfig = require("./knexfile");

const server = express();
const db = knex(dbConfig.development);

server.use(express.json());
server.use(helmet());

//-------------ENDPOINTS FOR ZOO TABLE IN DATABASE----------------------

server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json({ err });
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
      res.status(500).json({ err });
    });
});

server.post("/api/zoos", (req, res) => {
  const newZoo = req.body;
  db.insert(newZoo)
    .into("zoos")
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ message: "Deleted Successfully" });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db("zoos")
    .where({ id })
    .update(data)
    .then(count => {
      res.status(200).json({ message: "Successfully updated database" });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

// ---------ENDPOINTS FOR BEARS TABLE IN DATABASE--------------------------

server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json({ err });
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
      res.status(500).json({ err });
    });
});

server.post("/api/bears", (req, res) => {
  const data = req.body;
  db.insert(data)
    .into("bears")
    .then(id => {
      res.status(200).json(id);
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  db("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ message: "Deleted item successfully" });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

server.put("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  const data = req.body;
  db("bears")
    .where({ id })
    .update(data)
    .then(count => {
      res.status(200).json({ message: "Updated the database with new data" });
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
