const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

//Create
//create a new zoo
//-------------------------------------------
router.post('', (req, res) => {
	const zoo = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db.insert(zoo).into('zoos')
	.then(ids => {
		res.status(201).json(ids)
	})
	.catch(error => res.status(500).json(error))

})

//Read
//get all zoos
//-------------------------------------------
router.get('', (req, res) => {
	db('zoos')
	.then(zoos => {
		res.status(200).json(zoos)
	})
	.catch(error => res.status(500).json(error))
})

//get a specific zoo
router.get('/:id', (req, res) => {
	const { id } = req.params;
	db('zoos')
	.where({id})
	.then(zoo => {
		res.status(200).json(zoo)
	})
	.catch(error => res.status(500).json(error))
})


//Update
//update a zoo
//-------------------------------------------
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db('zoos')
	.where({ id: id })
	.update(changes)
	.then(zoo => {
		res.status(200).json(zoo)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//Delete
//delete a zoo
//-------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('zoos')
	.where({id: id})
	.del()
	.then(response => {
		res.status(200).json(response)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

module.exports = router;
