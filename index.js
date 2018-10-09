const express = require("express");
const knex = require("knex");
const knexConfig = require("./knexfile");
const db = knex(knexConfig.development);
const helmet = require("helmet");

const server = express();
server.use(express.json());
server.use(helmet());

// endpoints here
server.get("/all", (req, res) => {
  res.send("This is a test");
});

//ADD A ZOO
server.post("/api/zoos", (req, res) => {
  const zoo = req.body;

  db.insert(zoo)
    .into("zoos")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//ADD A BEAR
server.post("/api/bears", (req, res) => {
  const bear = req.body;

  db.insert(bear)
    .into("bears")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET ALL ZOOS
server.get("/api/zoos", (req, res) => {
  db("zoos")
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET ALL BEARS
server.get("/api/bears", (req, res) => {
  db("bears")
    .then(bears => {
      res.status(200).json(bears);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//GET SPECIFIC ZOO BY ID
server.get("/api/zoos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const zoo = await db("zoos").where({ id });
    res.status(200).json(zoo);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET SPECIFIC BEAR BY ID
server.get("/api/bears/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const bear = await db("bears").where({ id });
    res.status(200).json(bear);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE A ZOO THAT YOU THINK SUCKS
server.delete("/api/zoos/:id", (req, res) => {
  const { id } = req.params;

  db("zoos")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//DELETE A BEAR THAT YOU THINK SUCKS [Cedric Benson recommended]
server.delete("/api/bears/:id", (req, res) => {
  const { id } = req.params;

  db("bears")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//UPDATE A ZOO
server.put("/api/zoos/:id", (req, res) => {
  const { id } = req.params;
  const updatedBody = req.body;

  db("zoos")
    .where({ id })
    .update(updatedBody)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

//UPDATE A BEAR
server.put("/api/bears/:id", (req, res) => {
  const { id } = req.params;
  const updatedBody = req.body;

  db("bears")
    .where({ id })
    .update(updatedBody)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
