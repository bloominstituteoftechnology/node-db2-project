const express = require("express");
const knex = require("knex");

const knexConfiguration = {
    client: "sqlite3",
    connection: {
        filename: "./data/car-dealer.db3"
    },
    useNullAsDefault: true
};

const db = knex(knexConfiguration);

const router = express.Router();

module.exports = router;