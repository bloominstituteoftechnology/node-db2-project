const express = require("express");
const router = express.Router();
const zooController = require('../controllers/index')

router.get("/", (req, res) => zooController.get('zoos', req, res));

router.get("/:id", (req, res) => zooController.getId('zoos', req, res));

router.post("/", (req, res) => zooController.post('zoos', req, res));

router.delete("/:id", (req, res) => zooController.del('zoos', req, res));

router.put("/:id", (req, res) => zooController.put('zoos', req, res));

module.exports = router;
