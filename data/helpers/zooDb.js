const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('zoos as z');
		if (id) {
			return query
				.select('id', 'name')
				.where('z.id', id);
		}
		return query;
	},

	insert: function(name) {
		let query = db('zoos as z');
		return query
			.insert(name)
			.then(id => ({ id: id }));
	},

	update: function(id, name) {
		let query = db('zoos as z');
		return query
			.select('id', 'name')
			.where('z.id', id)
			.update(name);
	},

	delete: function(id) {
		let query = db('zoos as z');
		return query
			.where('id', id)
			.del();
	},
};
