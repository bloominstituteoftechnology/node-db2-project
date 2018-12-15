const bearDb = require("../data/helpers/bearDb");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  bearDb
    .get()
    .then(bears => {
      bears[0]
        ? res.json(bears)
        : res
            .status(400)
            .json({ error: "there are currently no bears in our directory" });
    })
    .catch(err => {
      res.status(500).json({ error: "could not retrieve bears" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  bearDb
    .get(id)
    .then(bear => {
      if (bear[0]) {
        res.json(bear);
      } else {
        res.status(404).json({ error: "bear does not exist" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "bear could not be retrieved." });
    });
});

router.post("/", (req, res) => {
  const newBear = req.body;
  if (!newBear.name || newBear.name === "") {
    res.status(400).json({ error: "name is required" });
  } else if (typeof newBear.name !== "string") {
    res.status(400).json({ error: "name must be a string" });
  } else {
    bearDb
      .insert(newBear)
      .then(id => res.status(201).json(id))
      .catch(err => res.status(500).json({ error: "trouble adding bear" }));
  }
});

router.put("/:id", (req, res) => {
  const updatedBear = req.body;
  const { id } = req.params;
  bearDb
    .get(id)
    .then(bear => {
      if (bear[0]) {
        if (!updatedBear.name || updatedBear.name === "") {
          res.status(400).json({ error: "name is required" });
        } else if (typeof updatedBear.name !== "string") {
          res.status(400).json({ error: "name must be a string" });
        } else {
          bearDb
            .update(id, updatedBear)
            .then(rows => {
              bearDb
                .get(id)
                .then(bear => res.status(201).json(bear))
                .catch(err =>
                  res
                    .status(500)
                    .json({ error: "trouble retrieving updated bear" })
                );
            })
            .catch(err =>
              res.status(500).json({ error: "trouble updating bear" })
            );
        }
      } else {
        res.status(404).json({ error: "bear does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving bear to update" })
    );
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await bearDb.get(id);

  bearDb
    .get(id)
    .then(bear => {
      if (bear[0]) {
        bearDb
          .remove(id)
          .then(rows => res.status(201).json(deleted))
          .catch(err =>
            res.status(500).json({ error: "trouble deleting bear" })
          );
      } else {
        res.status(404).json({ error: "bear does not exist" });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "trouble retrieving bear to be deleted" })
    );
});

module.exports = router;
