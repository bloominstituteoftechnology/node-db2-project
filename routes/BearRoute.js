const express = require("express");
const router = express.Router();
const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

router.get("/", async (req, res) => {
  const bearData = await db.select().table("bears");
  res.status(200).json({
    status: true,
    bearData: bearData
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const bearData = await db("bears")
    .where({
      id: id
    })
    .select();
  res.status(200).json({
    status: true,
    bearData: bearData
  });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const bearID = await db("bears").insert({
      name: req.body.name
    });

    res.status(200).json({
      status: true,
      bearID: bearID[0]
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      status: false,
      message: "There was problem in inserting data into db"
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedID = await db("bears")
    .where({
      id: id
    })
    .del();
  res.status(200).json({
    status: true,
    deletedID: deletedID
  });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const updatedbear = await db("bears").update("name", req.body.name);
  res.status(200).json({
    status: true,
    updatedbear: updatedbear
  });
});

module.exports = router;
