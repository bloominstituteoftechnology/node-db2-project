const express = require("express");
const router = express.Router();
const db = require("../dbConfig.js");

router.post("/", (req, res) => {
	const bear = req.body;
	if (!bear.type) {
		return res.status(400).json({ message: "Please provide a type" });
	}
	db.insert(bear)
		.into("bears")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/", (req, res) => {
	db("bears")
		.then(bears => {
			res.status(201).json(bears);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	db("bears")
		.where({ id: req.params.id })
		.then(bear => {
			res.status(201).json(bear);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	db("bears")
		.where({ id: req.params.id })
		.del()
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	const bear = req.body;
	if (!bear.type) {
		return res.status(400).json({ message: "Please include type data" });
	}

	db("bears")
		.where({ id: req.params.id })
		.update({ type: bear.type })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
