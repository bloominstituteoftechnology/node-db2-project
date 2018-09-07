// Update with your config settings.

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/zoos.sqlite3"
    }
  },
  useNullAsDefault: true,
  migrations: {
    directory: "./db/migrations"
  }
};
