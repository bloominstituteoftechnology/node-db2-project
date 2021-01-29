const db = require('./dbConfig');

module.exports = {
    get,
    getByID,
    create,
    update,
    remove
}


function get (){
    return db.select()
} 

