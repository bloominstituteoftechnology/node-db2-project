const express = require("express");
const router = express.Router();
const bearController = require("../controllers/index");

router.get("/", bearController.get);

router.get("/:id", bearController.getId);

router.post("/", bearController.post);

router.delete("/:id", bearController.del);

router.put("/:id", bearController.put);
module.exports = router;
