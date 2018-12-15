const express = require("express");
const helmet = require("helmet");
const knex = require("knex"),
  dbConfig = require("./knexfile"),
  db = knex(dbConfig.development);
const server = express();

server.use(express.json());
server.use(helmet());

// endpoints here

// ~~~~~ POST ~~~~~
server.post("/api/zoos", (req, res) => {
  const { zoo } = req.body;
  db("zoos")
    .insert(zoo)
    .then(id => {
      res.status(201).json({ id });
    })
    .catch(err => {
      res.status(500).json({ error: "Creation failed, Please try again." });
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

// ~~~~~ GET ~~~~
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      if (zoos.length) {
        res.json({ zoos });
      } else {
        res.status(404).json({
          error: "There are no zoos. Please create a zoo first to view zoos."
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Cannot Fetch Zoos, Check your connection." });
    });
});

// ~~~~ GET FOR ZOO ID ~~~~~
server.get("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where("id", id)
    .then(zoo => {
      if (zoo.length) {
        res.json({ zoo });
      } else {
        res
          .status(404)
          .json({ error: "This zoo does not exist, search again" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Could not fetch zoo. Try again" });
    });
});

// ~~~~~ DELETE ~~~~~
server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  db("zoos")
    .where("id", id)
    .del()
    .then(count => {
      res.json({ count });
    })
    .catch(err => {
      res.status(500).json({ error: "Delete did not process. Try again." });
    });
});

// ~~~~~ UPDATE ~~~~~
server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const { zoo } = req.body;

  db("zoos")
    .where("id", id)
    .update(zoo)
    .then(count => {
      if (count) {
        res.json({ count });
      } else {
        res
          .status(400)
          .json({ error: "Zoo was not updated. Please try again." });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "Something went wrong. Check connection and try again."
      });
    });
});

// ~~~~~~ END ZOOS CRUD ~~~~~~

// ~~~~~~ START BEARS CRUD ~~~~~~~

// ~~~~~ POST ~~~~~
server.post("/api/animals/bears", (req, res) => {
  const { bear } = req.body;
  if (!bear.name.length) {
    return res.json({
      error: "Could Not Create New Bear, please add a name to bear."
    });
  }
  db("bears")
    .insert(bear)
    .then(newBear => {
      res.status(201).json({ newBear });
    })
    .catch(err => {
      res.status(500).json({ error: "Could Not create new bear, try again." });
    });
});

// ~~~~ GET ~~~~~
server.get("/api/animals/bears", (req, res) => {
  db("bears")
    .then(bears => {
      if (bears.length) {
        res.json({ bears });
      } else {
        res
          .status(404)
          .json({ error: "No bears exist, please add a bear first." });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "Please check your connection and try again." });
    });
});
