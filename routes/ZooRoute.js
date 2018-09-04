const express = require("express");
const router = express.Router();
const zooController = require("../controllers/index");

router.get("/", zooController.get);

router.get("/:id", zooController.getId);

router.post("/", zooController.post);

router.delete("/:id", zooController.del);

router.put("/:id", zooController.put);

module.exports = router;
