const express = require("express");
const router = express.Router();
const bearController = require('../controllers/index')

router.get("/", (req, res) => bearController.get('bears', req, res));

router.get("/:id", (req, res) => bearController.getId('bears', req, res));

router.post("/", (req, res) => bearController.post('bears', req, res));

router.delete("/:id", (req, res) => bearController.del('bears', req, res));

router.put("/:id", (req, res) => bearController.put('bears', req, res));
module.exports = router;
