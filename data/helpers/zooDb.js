const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('zoos as z');
		if (id) {
			return query
				.select('name')
				.where('z.id', id)
		}

		return query;
	},

	insert: function(newZoo) {
		let query = db('zoos as z');

		return query
			.insert(newZoo)
			.then(id => ({ id: id }));
	},
};
