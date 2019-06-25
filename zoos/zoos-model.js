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

function add(zoos) {
    return db('zoos')
        .insert(zoos, 'id')
        .then(ids => {
            const [id] = ids;

            return getById(id);
        });
}

function update(id, changes) {
    return db('zoos')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                return getById(id);
            } else {
                return null;
            }
        });
}
