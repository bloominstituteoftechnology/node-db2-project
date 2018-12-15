const zooDb = require("../data/helpers/zooDb");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  zooDb
    .get()
    .then(zoos => {
      zoos[0]
        ? res.json(zoos)
        : res
            .status(400)
            .json({ error: "there are currently no zoos in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve zoos" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  zooDb
    .get(id)
    .then(zoo => {
      if (zoo[0]) {
        res.json(zoo);
      } else {
        res.status(404).json({ error: "zoo does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "zoo could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const newZoo = req.body;
  if (!newZoo.name || newZoo.name === "") {
    res.status(400).json({ error: "name is required" });
  } else if (typeof newZoo.name !== "string") {
    res.status(400).json({ error: "name must be a string" });
  } else {
    zooDb
      .insert(newZoo)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json({ error: "trouble adding zoo" }));
  }
});

router.put("/:id", (req, res) => {
  const updatedZoo = req.body;
  const { id } = req.params;
  zooDb
    .get(id)
    .then(zoo => {
      if (zoo[0]) {
        if (!updatedZoo.name || updatedZoo.name === "") {
          res.status(400).json({ error: "name is required" });
        } else if (typeof updatedZoo.name !== "string") {
          res.status(400).json({ error: "name must be a string" });
        } else {
          zooDb
            .update(id, updatedZoo)
            .then(rows => {
              zooDb
                .get(id)
                .then(zoo => res.status(201).json(zoo))
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: "trouble retrieving updated zoo" })
                );
            })
            .catch(err =>
              res.status(500).json({ error: "trouble updating zoo" })
            );
        }
      } else {
        res.status(404).json({ error: "zoo does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving zoo to update" })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await zooDb.get(id);

  zooDb
    .get(id)
    .then(zoo => {
      if (zoo[0]) {
        zooDb
          .remove(id)
          .then(rows => res.status(201).json(deleted))
          .catch(err =>
            res.status(500).json({ error: "trouble deleting zoo" })
          );
      } else {
        res.status(404).json({ error: "zoo does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving zoo to be deleted" })
    );
});

module.exports = router;
