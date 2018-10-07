const express = require('express');
const router = express.Router();
const knex = require('knex')

const dbConfig = require('../knexfile')
const db = knex(dbConfig.development)

//Create
//create a new bear
//-------------------------------------------
router.post('', (req, res) => {
	const bear = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db.insert(bear).into('bears')
	.then(ids => {
		res.status(201).json(ids)
	})
	.catch(error => res.status(500).json(error))

})

//Read
//get all bears
//-------------------------------------------
router.get('', (req, res) => {
	db('bears')
	.then(bears => {
		res.status(200).json(bears)
	})
	.catch(error => res.status(500).json(error))
})

//get a specific bear
router.get('/:id', (req, res) => {
	const { id } = req.params;
	db('bears')
	.where({id})
	.then(bear => {
		res.status(200).json(bear)
	})
	.catch(error => res.status(500).json(error))
})


//Update
//update a bear
//-------------------------------------------
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	//test to make sure name field is filled out
	if (!req.body.name){
		return res.status(400).json({msg: 'please provide name'})
	}

	db('bears')
	.where({ id: id })
	.update(changes)
	.then(bear => {
		res.status(200).json(bear)
	})
	.catch(error => {
		res.status(500).json(error)
	})
})

//Delete
//delete a bear
//-------------------------------------------
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db('bears')
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
