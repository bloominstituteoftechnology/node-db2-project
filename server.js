const express = require('express');
const db = require('./data/dbConfig');

const server = express();
server.use(express.json());

function getAllCars() {
	return db('cars');
}

function getCarById(id) {
	return db('cars').where({ id });
}

function addNewCar({ carData }) {
	return db('cars').insert({ carData });
}

function updateCarById(id, { carData }) {
	return db('cars')
		.where({ id })
		.update({ carData });
}

function deleteCarById(id) {
	return db('cars')
		.where({ id })
		.del();
}

server.use(express.json());
