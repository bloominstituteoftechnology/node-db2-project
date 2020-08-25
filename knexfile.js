module.exports = {
    client: "sqlite3", 
    useNullAsDefault: true, //option that's require for SQLite
    connection: {
        filename: "./data/car-dealer.db3", //location of our database file
    }
}