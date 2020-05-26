const knex = require("knex");

const knexConfig = {
    client: "sqlite3",
    connection: {
        filename: "./data/car.db3",
    },
    useNullAsDefault: true,
};

module.exports = knex(knexConfig);