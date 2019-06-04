const knex = require("knex");
const router = require("express").Router();

const Zoos = require("./zoos-model.js");

const knexConfig = {
  client: "sqlite3",
  connection: {
    filename: "./data/lambda.db3"
  },
  useNullAsDefault: true // required only for sqlite3
  // debug: true,
};

const db = knex(knexConfig);

// get all zoos

router.get("/", (req, res) => {
  Zoos.find()
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// get by id

router.get("/:id", (req, res) => {
  Zoos.findById(req.params.id)
    .then(zoo => {
      if (zoo) {
        res.status(200).json(zoo);
      } else {
        res.status(404).json({
          message: "Role not found"
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// post a zoo

router.post("/", (req, res) => {
  Zoos.add(req.body, "id")
    .then(ids => {
      res.status(201).json(ids);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//put a zoo

router.put("/:id", (req, res) => {
  Zoos.update(req.params.id, req.body)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "aaa" });
      } else {
        res.status(404).json({ message: "bbb" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
