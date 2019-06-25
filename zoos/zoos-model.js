const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: `/data/lambda.db3`
    }
}

const db = knex(knexConfig);

module.exports = {
    get,
    getById,
    add,
    update, 
    remove,
};

function get() {
    return db('zoos');
}

function getById(id) {
    return db('zoos')
        .where({ id })
        .first();
}
