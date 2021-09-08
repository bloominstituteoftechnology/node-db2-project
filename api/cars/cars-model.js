const db = require('../../data/db-config');

function getAll() {
	return db('cars');
}

async function getById(id) {
	const result = await db('cars').where('id', id).first();
	return result;
}

async function create(car) {
	return db('cars')
		.insert(car)
		.then(([id]) => {
			return getById(id);
		});
}
async function getByVin(vin) {
	return db('cars').where('vin', vin).first();
}

module.exports = {
	getAll,
	getById,
	create,
	getByVin,
};
