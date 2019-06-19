module.exports = {
find,
findById,
add, 
update,
remove
}



const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
    filename: './data/zoos.db3',
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

function add(zoo) {
    return db('zoos').insert(zoo, 'id')
    .then(ids => {
        const [id] = ids;
        return findById(id)
    })
}

function find() {
    return db('zoos');
}

function findById(id) {
    return db('zoos').where({ id }).first();
}

function remove(id) {
    return findById(id).then(zoo => {
        if (zoo) {
            return db('zoos').where({ id })
            .del()
            .then(() => zoo)
        } else {
            return null
        }
    })
}

function update(id, changes) {
    return db('zoos').where({ id })
    .update(changes)
    .then(count => {
        if (count > 0) {
            return findById(id)
        } else {
            return null
        }
    })
}