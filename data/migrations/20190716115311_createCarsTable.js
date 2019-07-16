exports.up = function(knex) {
	return knex.schema.createTable('cars', table => {
		table.increments();
		table
			.text('VIN', 128)
			.unique()
			.notNullable();
		table.text('Make', 128).notNullable();
		table.text('Model', 128).notNullable();
		table.decimal('Mileage').notNullable();
		table.text('Type', 128);
		table.text('Status', 128);
	});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('cars');
};
