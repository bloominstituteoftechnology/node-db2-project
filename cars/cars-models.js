const db = require('../data/db-config');

function find(){
    return db ('cars');
}

function findById() {
    return db('cars').where({id}).first();
}



modules.exports ={
    find,
    findById,
    FindPosts,
    add,
    update,
    remove
}