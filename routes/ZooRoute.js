const express = require("express");
const router = express.Router();
const knex = require("knex");
const dbConfig = require("../knexfile");

const db = knex(dbConfig.development);

router.get("/", async (req, res) => {
  const zooData = await db.select().table("zoos");
  res.status(200).json({
    status: true,
    zooData: zooData
  });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const zooData = await db("zoos")
    .where({
      id: id
    })
    .select();
  res.status(200).json({
    status: true,
    zooData: zooData
  });
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const zooID = await db("zoos").insert({
      name: req.body.name
    });

    res.status(200).json({
      status: true,
      zooID: zooID[0]
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "There was problem in inserting data into db"
    });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const deletedID = await db("zoos")
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
  const updatedZoo = await db("zoos").update("name", req.body.name);
  res.status(200).json({
    status: true,
    updatedZoo: updatedZoo
  });
});

module.exports = router;
