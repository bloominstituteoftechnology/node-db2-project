// Update with your config settings.

module.exports = {
    development: {
        client: "sqlite3",
        connection: {
            filename: "./cars.db3",
        },
        useNullAsDefault: true,
    },
};
