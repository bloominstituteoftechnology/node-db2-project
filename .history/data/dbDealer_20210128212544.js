const db = require('./dbConfig');

module.exports = {
    get,

}


function get (){
    return db.select()
} 

