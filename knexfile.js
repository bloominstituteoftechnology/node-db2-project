module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './lambda.sqlite3'
		},
		useNullAsDefault: true
	}
	// migrations: {
	//     directory: './data/migrations',
	//     tableName: 'dbmigrations',
	//   }
};
