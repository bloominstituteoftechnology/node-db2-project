const express = require("express");
const router = express.Router();
const db = require("../dbConfig.js");

router.post("/", (req, res) => {
	const zoo = req.body;
	if (!zoo.name) {
		return res.status(400).json({ message: "Please provide a name" });
	}
	db.insert(zoo)
		.into("zoos")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/", (req, res) => {
	db("zoos")
		.then(zoos => {
			res.status(201).json(zoos);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.get("/:id", (req, res) => {
	db("zoos")
		.where({ id: req.params.id })
		.then(zoo => {
			res.status(201).json(zoo);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	db("zoos")
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
	const zoo = req.body;
	if (!zoo.name) {
		return res.status(400).json({ message: "Please include name data" });
	}

	db("zoos")
		.where({ id: req.params.id })
		.update({ name: zoo.name })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

module.exports = router;
