const db = require('./dbConfig');

module.exports = {
    get,
    getByID

}


function get (){
    return db.select('*').from('car-dealer')
} 

function getByID(id){
    return db.select('*').from('car-dealer').where({'id': id})
}