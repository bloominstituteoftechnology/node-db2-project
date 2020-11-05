module.exports = {
  client: "sqlite3",
  useNullAsDefault: true,
  migrations: {
      directory: './data/migrations'
    },
  connection: {
      filename: "./data/car-dealer.db3"
  }
} 