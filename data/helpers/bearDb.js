const db = require('../dbConfig.js');

module.exports = {
	get: function(id) {
		let query = db('bears as b');
		if (id) {
			return query
				.select('id', 'name')
				.where('b.id', id);
		}
		return query;
	},

	insert: function(name) {
		let query = db('bears as b');
		return query
			.insert(name)
			.then(id => ({ id: id }));
	},

	update: function(id, name) {
		let query = db('bears as b');
		return query
			.select('id', 'name')
			.where('b.id', id)
			.update(name);
	},

	delete: function(id) {
		let query = db('bears as b');
		return query
			.where('b.id', id)
			.del();
	},
};
