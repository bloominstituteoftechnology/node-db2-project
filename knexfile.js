module.exports = {
	client: "sqlite3", // specifying the DBMS
	useNullAsDefault: true, // an option that's required for SQLite
	connection: {
		filename: "./data/cars.db3", // location of our database file
	},
}