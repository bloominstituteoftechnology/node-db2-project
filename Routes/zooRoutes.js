const express = require("express");
const router = express.Router();
const db = require("../dbConfig.js");

router.post("/", (req, res, next) => {
	const zoo = req.body;
	if (!zoo.name) {
		return next({ code: 400 });
	}
	db.insert(zoo)
		.into("zoos")
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => {
			next(err);
		});
});

router.get("/", (req, res, next) => {
	db("zoos")
		.then(zoos => {
			res.status(201).json(zoos);
		})
		.catch(err => {
			next(err);
		});
});

router.get("/:id", (req, res, next) => {
	db("zoos")
		.where({ id: req.params.id })
		.then(zoo => {
			res.status(201).json(zoo);
		})
		.catch(err => {
			next(err);
		});
});

router.delete("/:id", (req, res, next) => {
	db("zoos")
		.where({ id: req.params.id })
		.del()
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			next(err);
		});
});

router.put("/:id", (req, res, next) => {
	const zoo = req.body;
	if (!zoo.name) {
		return next({ code: 400 });
	}

	db("zoos")
		.where({ id: req.params.id })
		.update({ name: zoo.name })
		.then(ver => {
			res.status(201).json(ver);
		})
		.catch(err => {
			next(err);
		});
});

module.exports = router;
